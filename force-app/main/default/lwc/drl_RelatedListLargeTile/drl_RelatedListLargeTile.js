import { LightningElement, track,api } from 'lwc';

export default class Drl_RelatedListSmallTile extends LightningElement {
    @api tiledata;
    @api column;
    @track JSONdata;
    @track tileData={};
    @track navURL;
    @track tileTitle = '';
    @track tileDetails = [];
    @track showDeleteAction;
    @track showEditAction;
    @track showActions=false;
    bFirstLoad = true;
    @track menuDivClasses = "slds-dropdown-trigger slds-dropdown-trigger_click slds-button_last";

    renderedCallback(){
        if(this.bFirstLoad){
        //let data = JSON.parse(this.data);
        let data = this.tiledata;
        //let JSONColumns = JSON.parse(this.column);
        let JSONColumns = this.column;
        let tileDetails=[];
        JSONColumns.forEach(element => {
                if(element.type == 'url'){
                    if(element.typeAttributes && element.typeAttributes.label != null && element.typeAttributes.label.fieldName != null){
                        tileDetails.push({'label': element.label,'urlTitle': data[element.typeAttributes.label.fieldName], 'value': data[element.fieldName],
                                          'isURL' : true,'isText': false, 'isDateLocal': false,'isDate': false,'isEmail': false,
                                          'isNumber': false, 'isPercent': false, 'isPhone': false, 'isCurrency': false });
                    } else{
                        tileDetails.push({'label': element.label, 'value': data[element.fieldName],
                                          'isURL' : true,'isText': false, 'isDateLocal': false,'isDate': false,'isEmail': false,
                                          'isNumber': false, 'isPercent': false, 'isPhone': false, 'isCurrency': false});
                    }
                }
                if(element.type == 'text'){
                    if(element.typeAttributes && element.typeAttributes.linkify){
                        tileDetails.push({'label': element.label, 'value': data[element.fieldName],
                                          'isURL' : false,'isText': true, 'isDateLocal': false,'isDate': false,'isEmail': false,
                                          'isNumber': false, 'isPercent': false, 'isPhone': false, 'isCurrency': false});
                    } else {
                        tileDetails.push({'label': element.label, 'value': data[element.fieldName],
                                          'isURL' : false,'isText': true, 'isDateLocal': false,'isDate': false,'isEmail': false,
                                          'isNumber': false, 'isPercent': false, 'isPhone': false, 'isCurrency': false});
                    }
                }
                if(element.type == 'date-local'){
                    let JSONdata ={
                                          'isURL' : false,'isText': false, 'isDateLocal': true,'isDate': false,'isEmail': false,
                                          'isNumber': false, 'isPercent': false, 'isPhone': false, 'isCurrency': false
                                    };
                    JSONdata['label'] =element.label;
                    JSONdata['value'] =data[element.fieldName];
                    if(element.typeAttributes && element.typeAttributes.day){
                        JSONdata['day'] =element.typeAttributes.day;
                    }
                    if(element.typeAttributes && element.typeAttributes.month){
                        JSONdata['month'] =element.typeAttributes.month;
                    }
                    if(element.typeAttributes && element.typeAttributes.year){
                        JSONdata['year'] =element.typeAttributes.year;
                    }
                    tileDetails.push(JSONdata);
               }
               if(element.type == 'date'){
                let JSONdata ={           'isURL' : false,'isText': false, 'isDateLocal': false,'isDate': true,'isEmail': false,
                                          'isNumber': false, 'isPercent': false, 'isPhone': false, 'isCurrency': false};
                JSONdata['label'] =element.label;
                JSONdata['value'] =data[element.fieldName];
                if(element.typeAttributes && element.typeAttributes.day){
                    JSONdata['day'] =element.typeAttributes.day;
                }
                if(element.typeAttributes && element.typeAttributes.month){
                    JSONdata['month'] =element.typeAttributes.month;
                }
                if(element.typeAttributes && element.typeAttributes.year){
                    JSONdata['year'] =element.typeAttributes.year;
                }
                if(element.typeAttributes && element.typeAttributes.era){
                    JSONdata['era'] =element.typeAttributes.era;
                }
                if(element.typeAttributes && element.typeAttributes.hour){
                    JSONdata['hour'] =element.typeAttributes.hour;
                }
                if(element.typeAttributes && element.typeAttributes.hour12){
                    JSONdata['hour12'] =element.typeAttributes.hour12;
                }
                if(element.typeAttributes && element.typeAttributes.minute){
                    JSONdata['minute'] =element.typeAttributes.minute;
                }
                if(element.typeAttributes && element.typeAttributes.second){
                    JSONdata['second'] =element.typeAttributes.second;
                }
                if(element.typeAttributes && element.typeAttributes.timeZone){
                    JSONdata['timeZone'] =element.typeAttributes.timeZone;
                }
                if(element.typeAttributes && element.typeAttributes.timeZoneName){
                    JSONdata['timeZoneName'] =element.typeAttributes.timeZoneName;
                }
                if(element.typeAttributes && element.typeAttributes.weekday){
                    JSONdata['weekday'] =element.typeAttributes.weekday;
                }
                tileDetails.push(JSONdata);
                }
                if(element.type == 'email'){
                    tileDetails.push({'label': element.label, 'value': data[element.fieldName],
                                     'isURL' : false,'isText': false, 'isDateLocal': false,'isDate': false,'isEmail': true,
                                     'isNumber': false, 'isPercent': false, 'isPhone': false, 'isCurrency': false});
                }
                if(element.type == 'number'){
                    let JSONdata ={
                        'isURL' : false,'isText': false, 'isDateLocal': false,'isDate': false,'isEmail': false,
                        'isNumber': true, 'isPercent': false, 'isPhone': false, 'isCurrency': false
                    };
                    JSONdata['label'] =element.label;
                    JSONdata['value'] =data[element.fieldName];
                if(element.typeAttributes && element.typeAttributes.minimumIntegerDigits){
                    JSONdata['minimumIntegerDigits'] =element.typeAttributes.minimumIntegerDigits;
                }
                if(element.typeAttributes && element.typeAttributes.minimumFractionDigits){
                    JSONdata['minimumFractionDigits'] =element.typeAttributes.minimumFractionDigits;
                }
                if(element.typeAttributes && element.typeAttributes.maximumFractionDigits){
                    JSONdata['maximumFractionDigits'] =element.typeAttributes.maximumFractionDigits;
                }
                if(element.typeAttributes && element.typeAttributes.minimumSignificantDigits){
                    JSONdata['minimumSignificantDigits'] =element.typeAttributes.minimumSignificantDigits;
                }
                if(element.typeAttributes && element.typeAttributes.maximumSignificantDigits){
                    JSONdata['maximumSignificantDigits'] =element.typeAttributes.maximumSignificantDigits;
                }
                    tileDetails.push(JSONdata);
                }
                if(element.type == 'percent'){
                    let JSONdata ={
                        'isURL' : false,'isText': false, 'isDateLocal': false,'isDate': false,'isEmail': false,
                        'isNumber': false, 'isPercent': true, 'isPhone': false, 'isCurrency': false
                    };
                    JSONdata['label'] =element.label;
                    JSONdata['value'] =data[element.fieldName];
                if(element.typeAttributes && element.typeAttributes.minimumIntegerDigits){
                    JSONdata['minimumIntegerDigits'] =element.typeAttributes.minimumIntegerDigits;
                }
                if(element.typeAttributes && element.typeAttributes.minimumFractionDigits){
                    JSONdata['minimumFractionDigits'] =element.typeAttributes.minimumFractionDigits;
                }
                if(element.typeAttributes && element.typeAttributes.maximumFractionDigits){
                    JSONdata['maximumFractionDigits'] =element.typeAttributes.maximumFractionDigits;
                }
                if(element.typeAttributes && element.typeAttributes.minimumSignificantDigits){
                    JSONdata['minimumSignificantDigits'] =element.typeAttributes.minimumSignificantDigits;
                }
                if(element.typeAttributes && element.typeAttributes.maximumSignificantDigits){
                    JSONdata['maximumSignificantDigits'] =element.typeAttributes.maximumSignificantDigits;
                }
                if(element.typeAttributes && element.typeAttributes.step){
                    JSONdata['step'] =element.typeAttributes.step;
                }
                    tileDetails.push(JSONdata);
                }
                if(element.type == 'phone'){
                    tileDetails.push({'label': element.label, 'value': data[element.fieldName],
                    'isURL' : false,'isText': false, 'isDateLocal': false,'isDate': false,'isEmail': false,
                    'isNumber': false, 'isPercent': false, 'isPhone': true, 'isCurrency': false});
                }
                if(element.type == 'currency'){
                    let JSONdata ={'isURL' : false,'isText': false, 'isDateLocal': false,'isDate': false,'isEmail': false,
                    'isNumber': false, 'isPercent': false, 'isPhone': false, 'isCurrency': true};
                    JSONdata['label'] =element.label;
                    JSONdata['value'] =data[element.fieldName];
                if(element.typeAttributes && element.typeAttributes.currencyCode){
                    JSONdata['currencyCode'] =element.typeAttributes.currencyCode;
                }
                if(element.typeAttributes && element.typeAttributes.currencyDisplayAs){
                    JSONdata['currencyDisplayAs'] =element.typeAttributes.currencyDisplayAs;
                }
                if(element.typeAttributes && element.typeAttributes.minimumIntegerDigits){
                    JSONdata['minimumIntegerDigits'] =element.typeAttributes.minimumIntegerDigits;
                }
                if(element.typeAttributes && element.typeAttributes.minimumFractionDigits){
                    JSONdata['minimumFractionDigits'] =element.typeAttributes.minimumFractionDigits;
                }
                if(element.typeAttributes && element.typeAttributes.maximumFractionDigits){
                    JSONdata['maximumFractionDigits'] =element.typeAttributes.maximumFractionDigits;
                }
                if(element.typeAttributes && element.typeAttributes.maximumSignificantDigits){
                    JSONdata['maximumSignificantDigits'] =element.typeAttributes.maximumSignificantDigits;
                }
                if(element.typeAttributes && element.typeAttributes.minimumSignificantDigits){
                    JSONdata['minimumSignificantDigits'] =element.typeAttributes.minimumSignificantDigits;
                }
                if(element.typeAttributes && element.typeAttributes.step){
                    JSONdata['step'] =element.typeAttributes.step;
                }
                    tileDetails.push(JSONdata);
                }
                if(element.type == 'action'){
                    if(element.typeAttributes && element.typeAttributes.rowActions != null){
                        element.typeAttributes.rowActions.forEach(rowAction =>{
                            if(rowAction.name == 'Edit_Button'){
                                this.showEditAction=true;
                            }
                            if(rowAction.name == 'Delete_Button'){
                                this.showDeleteAction=true;
                            }
                        });
                        if(this.showEditAction || this.showDeleteAction){
                            this.showActions =true;
                        }
                    }
                }
            
            this.tileDetails = tileDetails;
            
       
    });
        let dataSet =tileDetails[0];
        this.navURL = data['Id'];
        this.tileTitle = dataSet.label;
        if(dataSet.isURL){
            this.tileTitle = dataSet.urlTitle;
        }
        tileDetails.shift();

        this.bFirstLoad= false;
        }
    }

    openActionMenu(event){
        if(this.menuDivClasses.includes(' slds-is-open')){
            this.menuDivClasses= this.menuDivClasses.replace(' slds-is-open', '');
        } else {
            this.menuDivClasses+= ' slds-is-open';
        }
    }

    handleActionClick(event){
        this.dispatchEvent(
        new customEvent('edit', {
            'recordId' : tileData['Id']
        }));
    }

}