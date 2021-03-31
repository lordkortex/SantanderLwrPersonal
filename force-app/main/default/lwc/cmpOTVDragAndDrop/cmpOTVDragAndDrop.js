import { LightningElement } from 'lwc';

import { loadStyle }  from 'lightning/platformResourceLoader';
import Icons          from '@salesforce/resourceUrl/Santander_Icons';
import Tokens         from '@salesforce/resourceUrl/DesignSystem';
import DragAndDropT01 from '@salesforce/resourceUrl/lwc_drag_and_drop_type01';

export default class CmpOTVDragAndDrop extends LightningElement {
    connectedCallback() {
        loadStyle(this, Icons + '/style.css'),
            loadStyle(this, Tokens)
            loadStyle(this, DragAndDropT01);
    }
    
    handleFilesChange(event){
        this.uploadedFile = event.target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        console.log(this.uploadedFile);
    
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64
            }
            console.log(this.fileData);
        }
        reader.readAsDataURL(file);
        
    const uploadedFiles = new CustomEvent('changefiles', {detail: {dataFile : event.target.value}});
    this.dispatchEvent(uploadedFiles);
    }

}