import { LightningElement, track, api } from 'lwc';
import getData from '@salesforce/apex/DRL_Controller.getMetadata';

export default class drl_RelatedList extends LightningElement {

    @track rltdList_Title = 'Notes & Attachments';
    @track data;
    @track isTable = false;
    @track columnData;
    @track bFirstLoad = true;
    @track isTile1 = false;
    @api recordId;

   renderedCallback(){
    
    if(this.recordId && this.bFirstLoad){
        let object = { 'recordId': this.recordId, 'relatedListName': 'Notes_Attachments' }
        getData({'mapInputParams' : object}).then(result => {
                this.isTable = true;
                if(result.data){
                    this.data = JSON.parse(result.data);
                    console.log('Data:  '+JSON.stringify(this.data));
                }
                if(result.columnData){
                    this.columnData = JSON.parse(result.columnData);
                    console.log('Column:  '+JSON.stringify(this.columnData));
                }
        }).catch(error => {
                console.log('error : '+JSON.stringify(error));
        });
        this.bFirstLoad = false;
    }
   }
}