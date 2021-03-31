/* MODAL FULL SCREEN */
.modalFullScreen .slds-modal__container {
    min-width: 100%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    background-color: #f6f6f6;
    padding:0;
    /* padding: 140px;*/
}

/* MODAL HEADER */
.modalFullScreen .redHeader.slds-modal__header {
    border-bottom: none;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding: 0px;
    width: 100%;
    z-index: 15;
    display: flex;
    justify-content: center;
    background-color: #cc0000;
}

.modalFullScreen .redHeader.slds-modal__header .row{
   	padding-left: 100px;
    margin: 0 auto;
    width: 1440px;
    height: 64px;
    align-items: center;
}

/* MODAL CONTENT */
.modalFullScreen .slds-modal__content {
    /*background-color: #f6fafc;*/
    background-color:#ffffff;
    margin-top: 76px;
    width: 100%;
    height: 100%;
    margin:0;
}

.modalFullScreen .slds-modal__content:last-child {
	box-shadow: none;
}

.modalFullScreen .slds-modal__content .slds-grid__content{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
/* SCROLLBAR */
 ::-webkit-scrollbar {
	width: 6px;
}
 ::-webkit-scrollbar-track {
	border-radius: 10px;
}
 ::-webkit-scrollbar-track-piece {
	background: transparent;
}
 ::-webkit-scrollbar-thumb {
	background: #dadada;
	border-radius: 10px;
}

.modalFullScreen .footerContact{
	margin-top: 483px;
}
.modalFullScreen .footer{
	margin-top:260px;
}
.modalFullScreen .stickyButtons + .footerContact {
	margin-top: 364px;
}
.modalFullScreen .stickyButtons + .footer {
	margin-top: 140px;
}
.modalFullScreen .footerContact .cFooter, 
.modalFullScreen .footer .cFooter_Contact{
	display:none;
}

.modalFullScreen .type01 .contentSteps .container .type02{
    display: none;
} 
.modalFullScreen .type02 .contentSteps .container .type01{
    display: none;
} 
.modalFullScreen .type02{
    display: contents;
} 
.modalFullScreen .type02 .contentSteps .container .type02 .slds-col {
    margin: auto;
    min-height: 340px;
}
.welcomingHeader {
    background-color: #ffffff;
    width:100%;
    padding-top: 64px;
    position: relative;
}

.welcomingHeader .slds-grid{
    max-width: 1440px;
    margin: 0 auto;
    padding: 72px 108px 80px;
}

.welcomingHeader .slds-image {
    width:600px;
    height:400px;
    display:flex;
    justify-content: center;
    align-items: center;
}

.welcomingHeader .text{
    margin: 0 65px 0 0;
    max-width: 392px;
}

.welcomingHeader .text .slds-text-heading {
    font-family: "SantanderHeadlineW05-Bold";
    font-size: 36px;
    line-height: 43px;
    color: #444444;
    margin: 0 0 24px 0;
}

.welcomingHeader .text .slds-text-body {
    font-family:"SantanderHeadlineW05-Rg";
    font-size: 28px;
    line-height: 34px;
    color: #444444;
    margin: 0 0 32px 0;
}

.welcomingHeader .slds-col{
    max-width: 600px;
    width: 100%;
}
.welcomingHeader .slds-col:first-child{
    margin-right:24px;
    padding: 32px 0 40px;
}

.welcomingHeader .slds-button.button_link {
    margin:0;
    text-align: left;
}

.welcomingHeader .slds-button.button_link .icon_right:before{
    margin: 0;
}
.stickyButtons {
    width: 100%;
    position: sticky!important;
    bottom: 0px;
    box-shadow: 4px 4px 12px 4px rgba(0, 0, 0, 0.08), inset 0 1px 0 0 #cedee7;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-radius: unset;
    border: unset;
    margin-top: 120px;
    z-index:2;
}
.stickyButtons .content {
    width:1440px;
    display:flex;
    justify-content: space-between;
    padding: 24px 108px;
    align-items: center;
}
.stickyButtons .content .text {
    font-family: "SantanderHeadlineW05-Rg";
  	font-size: 20px;
	line-height: 28px;
    color: #444444;
}

.stickyButtons .contact{
    display: flex;
    align-items: center;
}

.stickyButtons .contact > .slds-button + .slds-button {
    margin-left: 24px;
}
.contentList{
    width: 100%;
}

Quicklinks
Profiles Chamber
Quick Console
Home
Quick Query
Execute Anonymous
Sobject fields
Quick ORG Describe
Replace API Names
Convert SF Id
Login As...
Options
Hide
