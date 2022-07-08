import { LightningElement, track, api } from 'lwc';
import getData from '@salesforce/apex/DRL_Controller.getMetadata';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class drl_RelatedList extends NavigationMixin(LightningElement) {
    
    @track data;
    @track columnData;
    @track buttonData;
    @track bFirstLoad = true;    
    @track isTable;    
    @track isTile1;
    @track isTile2;
    @track recordCount;
    @track listData;
    @track completeData;
    @track showSpinner=true;
    @track isModalOpen = false;
    @api recordId;
    @api rltdList_Title;
    @api rltdList_Config;
    @api rltdList_Icon;
    @api rltd_List_DisplayAs;

    rowId;

   renderedCallback(){
    if(this.recordId && this.bFirstLoad){
       this.getApexData();
        if(this.rltd_List_DisplayAs){
            if(this.rltd_List_DisplayAs == 'Table'){
                this.isTable=true;
                this.isTile1=false;
                this.isTile2=false;
            }
            if(this.rltd_List_DisplayAs == 'Compact Tile'){
                this.isTile1=true;
                this.isTile2=false;
                this.isTable=false;
            }
            if(this.rltd_List_DisplayAs == 'Detailed Tile'){
                this.isTile2=true;
                this.isTile1=false;
                this.isTable=false;
                
            }

        }
        this.bFirstLoad = false;
        this.showSpinner = false;
    }
   }


   handleListButtonClick(event){
    let payLoad = {
        'buttonLabel' : event.target.key,
        'componentToCreate' : event.target.dataset.component
    }

    const listButtonClicked = new CustomEvent(' ', {
        detail: { payLoad },
    });
    // Fire the custom event
    this.dispatchEvent(new CustomEvent('listbuttonclicked', {
        detail: { payLoad },
    }));
   }

   handleRowAction(event){
    const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log('row'+JSON.stringify(row));
        switch (actionName) {
            case 'Delete_Button':
                this.rowId = row.Id.toString().substring(1);           
                break;
            case 'Edit_Button':
                console.log('edit');
                this.editSFRecord(row.Id.toString().substring(1))
                break;
            default:
        }

   }

   deleteSFRecord(sRecordId){
    console.log('RecordId Delete'+sRecordId);
    deleteRecord(sRecordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })    
                );
                this.closeModal();
                this.refreshData();
            }).catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error deleting record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                    this.closeModal();
                });

    }
    editSFRecord(sRecordId){
        let back_url = window.location;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: sRecordId,
                actionName: 'edit'
            }
        });
    }
    navigateToViewAll(){
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__drl_RelatedViewAllList'
            },
            state: {
                c__relatedRecordId: this.recordId,
                c__relatedListTitle: this.rltdList_Title,
                c__relatedListConfig: this.rltdList_Config,
            }
        });
        
    }
    refreshData(){
        this.data=[];
        this.listData=[];
        this.getApexData();       
        
    }

    getApexData(){
        console.log('Apex Calles');        
        let object = { 'recordId': this.recordId, 'relatedListName': this.rltdList_Config }
        getData({'mapInputParams' : object}).then(result => {
            console.log('Res: '+JSON.stringify(result));
            if(result.data){
                this.data = JSON.parse(result.data);
                this.recordCount = this.data.length;
                if(this.recordCount>5){
                    this.listData = JSON.parse(result.data).splice(0,5);
                    this.recordCount = '';
                    this.recordCount ='5+';
                } else{
                    this.listData =JSON.parse(result.data);
                }
                console.log('Data:  '+JSON.stringify(this.data));
            }
            else{
                this.recordCount =0;
            }
            if(result.columnData){
                this.columnData = JSON.parse(result.columnData);
                console.log('Column:  '+JSON.stringify(this.columnData));
            }
            if(result.buttonData){
                console.log('Button Data:'+ JSON.stringify(result.buttonData))
                this.buttonData = eval(result.buttonData);
            }
    }).catch(error => {
            console.log('error : '+error);
    });
    }
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
             
        
        
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    deleteRecord() {
        this.deleteSFRecord(row.Id.toString().substring(1));
    }
}