import { LightningElement,track,api } from 'lwc';

export default class UploadFiles extends LightningElement {
    @track isModalOpen = true;
    @api recordId;
    
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
        
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }
}