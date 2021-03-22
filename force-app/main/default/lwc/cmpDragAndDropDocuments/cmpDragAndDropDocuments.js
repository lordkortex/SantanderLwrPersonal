import { LightningElement, track, api } from 'lwc';

//Resources
import { loadStyle } from 'lightning/platformResourceLoader';
import style from '@salesforce/resourceUrl/dragAndDropCSS';
import Images from '@salesforce/resourceUrl/Images';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Apex
import saveFile from '@salesforce/apex/CNT_FilesUtilities.saveFile';
import deleteFile from '@salesforce/apex/CNT_FilesUtilities.deleteFile';
import releatedFiles from '@salesforce/apex/CNT_FilesUtilities.releatedFiles';

//Labels
import remove from '@salesforce/label/c.cmpOTVModalRemove_4';
import cancel from '@salesforce/label/c.cancel';
import close from '@salesforce/label/c.close';
import yes from '@salesforce/label/c.Yes';
import PAY_removeFile from '@salesforce/label/c.PAY_removeFile';
import PAY_doYouWantToRemove from '@salesforce/label/c.PAY_doYouWantToRemove';
import PAY_file from '@salesforce/label/c.PAY_file';
import PAY_chooseOrDragAndDrop from '@salesforce/label/c.PAY_chooseOrDragAndDrop';
import PAY_document from '@salesforce/label/c.PAY_document';
import browseFile from '@salesforce/label/c.cmpOTVContactUsActivation_17';
import PAY_validFormatDragAndDrop from '@salesforce/label/c.PAY_validFormatDragAndDrop';
import PAY_validatingFile from '@salesforce/label/c.PAY_validatingFile';
import PAY_errorIncorrectFile from '@salesforce/label/c.PAY_errorIncorrectFile';
import PAY_validatingFiles from '@salesforce/label/c.PAY_validatingFiles';
import PAY_fileUploadSuccessfully from '@salesforce/label/c.PAY_fileUploadSuccessfully';
import PAY_doYouWantToRemoveTheFile from '@salesforce/label/c.PAY_doYouWantToRemoveTheFile';
import PAY_filesUploadSuccessfully from '@salesforce/label/c.PAY_filesUploadSuccessfully';

export default class CmpDropAndDropDocuments extends LightningElement {

  // Expose the labels to use in the template.
  label = {
    yes,
    cancel,
    remove,
    close,
    PAY_removeFile,
    PAY_doYouWantToRemove,
    PAY_file,
    PAY_chooseOrDragAndDrop,
    PAY_document,
    browseFile,
    PAY_validFormatDragAndDrop,
    PAY_validatingFile,
    PAY_errorIncorrectFile,
    PAY_validatingFiles,
    PAY_fileUploadSuccessfully,
    PAY_filesUploadSuccessfully,
    PAY_doYouWantToRemoveTheFile
  };

    @api currentFiles = [];
    @api paymentId;
    @track defaultUpload = true;
    @track validatingUpload = false;
    @track successUpload = false;
    @track errorUpload = false;
    @track loading = false;
    @track showRemoveModal = false;
    @track removeModalContentLabel;
    @track fileToRemove;
    @track uploadSeveralFiles = false;

    validTypes = ['JPG','JPEG','PNG','GIF','PDF','DOC','DOCX','XLS','XLSX','PPTX','MSG','TXT'];
    filesUploaded = [];
    file;
    fileName;
    fileContents;
    fileReader;
    content;
    MAX_FILE_SIZE = 10485760;


    spinner = Images + '/BS_s-loader.gif';

    renderedCallback() {
      Promise.all([
        loadStyle(this, style),
        loadStyle(this, santanderStyle+'/style.css')
      ]).then(() => {
          //this.getRelatedFiles();
      }).catch(error => {
          console.log("Error " + error.body.message);
      });
    }

  openRemoveModal(event){
    if(event.target.id != null && event.target.id != undefined){
      var s = event.target.id;
      this.fileToRemove = s.substring(0,s.indexOf('-'));
      if(event.target.getAttribute('name') != null && event.target.getAttribute('name') != undefined){
        this.removeModalContentLabel = this.label.PAY_doYouWantToRemove +" '"+event.target.getAttribute('name')+"' "+  this.label.PAY_file+'?';
      }else{
        this.removeModalContentLabel =  this.label.PAY_doYouWantToRemoveTheFile;
      }
      this.showRemoveModal = true;
    }
  }

  closeRemoveModal(){
    this.showRemoveModal = false;
  }

  // getting file 
  removeFile() {
    
    deleteFile({ fileId: this.fileToRemove})
      .then(result => {
        this.currentFiles = this.currentFiles.filter(item => item.key !== result);
        this.closeRemoveModal();
        this.informFiles();
      })
      .catch(error => {
        console.log(error);

      });
  }

  // getting file 
  handleFilesChange(event) {
    if(event.target.files.length > 0) {
      this.filesUploaded = event.target.files;
      this.validateFiles();
    }
  }

  //inform files

  informFiles() {
      //custom event
      const passEvent = new CustomEvent('informfiles', {
          detail:{currentFiles:this.currentFiles} 
      });
      this.dispatchEvent(passEvent);
  }

  validateFiles() {
    this.manageFront('validatingUpload');
    if(this.filesUploaded.length > 1){
      this.uploadSeveralFiles = true;
    }else{
      this.uploadSeveralFiles = false;
      this.fileName = this.filesUploaded[0].name;
    }
    for(let i = 0; i < this.filesUploaded.length; i++){
      var extension = this.filesUploaded[i].name.substr(this.filesUploaded[i].name.lastIndexOf('.') + 1).toUpperCase();
      if (this.filesUploaded[i].size > this.MAX_FILE_SIZE || !this.validTypes.includes(extension) ) {
          this.manageFront('errorUpload');
          return;
      }
    }
    // create a FileReader object 
    this.fileReader= new FileReader();
    // set onload function of FileReader object  
    this.readFile(0); 
  }

  readFile(i) {
    if( i >= this.filesUploaded.length ){
      this.manageFront('successUpload');
      return;
    }

    this.fileReader.onload = (() => {
        this.fileContents = this.fileReader.result;
        let base64 = 'base64,';
        this.content = this.fileContents.indexOf(base64) + base64.length;
        this.fileContents = this.fileContents.substring(this.content);
        // call the uploadProcess method 
        this.saveToFile(i);
      });

    this.fileReader.readAsDataURL(this.filesUploaded[i]);

  }

 // Calling apex class to insert the file
  saveToFile(index) {
    saveFile({ paymentId: this.paymentId, strFileName: this.filesUploaded[index].name, base64Data: encodeURIComponent(this.fileContents)})
    .then(result => {
        this.filesUploaded[index].key = result.Id;
        this.filesUploaded[index].index = index+1;
        this.currentFiles.push(this.filesUploaded[index]);
        this.informFiles();

        if(index < this.filesUploaded.length){
          this.readFile(index+1);
        }

    })
    .catch(error => {
      console.log(error);
      this.manageFront('errorUpload');
    });
  }

  get manageFrontMain(){

    if(this.defaultUpload == true){
      return 'drag-and-drop_container';
    }
    if(this.validatingUpload == true){
      return 'drag-and-drop_container validating-file';
    }
    if(this.errorUpload == true){
      return 'drag-and-drop_container error-file';
    }
    if(this.successUpload == true){
      return 'drag-and-drop_container success-file';
    }
  }
  
  manageFront(mode){
    if(mode == 'default'){
      this.defaultUpload = true;
      this.validatingUpload = false;
      this.errorUpload = false;
      this.successUpload = false;
    }

    if(mode == 'errorUpload'){
      this.defaultUpload = false;
      this.validatingUpload = false;
      this.errorUpload = true;
      this.successUpload = false;
    }

    if(mode == 'successUpload'){
      this.defaultUpload = false;
      this.validatingUpload = false;
      this.errorUpload = false;
      this.successUpload = true;
    }

    if(mode == 'validatingUpload'){
      this.defaultUpload = false;
      this.validatingUpload = true;
      this.errorUpload = false;
      this.successUpload = false;
    }
  }

  // Getting releated files of the current record
  getRelatedFiles() {
    releatedFiles({paymentId: this.paymentId})
    .then(data => {
        this.currentFiles = data;
    })
    .catch(error => {
       /* this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error!!',
                message: error.message,
                variant: 'error',
            }),
        );*/
        console.log(error);
    });
}

}