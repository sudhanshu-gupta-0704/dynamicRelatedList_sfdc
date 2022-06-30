import { LightningElement, track } from 'lwc';

export default class Drl_RelatedListSmallTile extends LightningElement {
    @track data = "{\"Type\":\"Note\",\"CreatedDate\":\"2022-06-24T11:51:03.000Z\",\"Id\":\"/0025g000000vhCXAAY\",\"UI_Title\":\"12312\"}";
    @track column = "[{\"typeAttributes\":{\"target\":\"_blank\",\"tooltip\":{\"fieldName\":\"UI_Title\"},\"label\":{\"fieldName\":\"UI_Title\"}},\"type\":\"url\",\"fieldName\":\"Id\",\"label\":\"Title\"},{\"type\":\"date-local\",\"fieldName\":\"CreatedDate\",\"label\":\"CreatedDate\"},{\"type\":\"text\",\"fieldName\":\"Type\",\"label\":\"Type\"}]";
    @track JSONdata;
    @track tileData={};

    renderedCallback(){
        let lowerCellData;
        let tileData ={};
        this.JSONdata = JSON.parse(this.data);
        this.JSONColumn = JSON.parse(this.column);

        this.JSONColumn.forEach(element => {
            if(element.type =="url"){
                tileData['isURL']=true;
                if(element.typeAttributes){
                    
                    tileData['value'] =  this.JSONdata[element.fieldName];
                    tileData['label'] =  this.JSONdata[element.typeAttributes.fieldName];
                } else {
                    tileData['value'] =  this.JSONdata[element.fieldName];
                    tileData['label'] =  this.JSONdata[element.fieldName];
                }

            }
            if(element.type =="text"){
                tileData['isText']=true;
                if(element.typeAttributes){
                    
                    tileData['value'] =  this.JSONdata[element.fieldName];
                }

            }
            if(element.type =="email"){
                tileData['isEmail']=true;
                if(element.typeAttributes){

                }

            }
            if(element.type =="date" || element.type =="date-local"){
                tileData['isDate']=true;
                if(element.typeAttributes){

                }

            }
            if(element.type =="number"){
                tileData['isNumber']=true;
                if(element.typeAttributes){

                }

            }
            if(element.type =="percent"){
                tileData['isPercent']=true;
                if(element.typeAttributes){

                }

            }
            if(element.type =="phone"){
                tileData['isPhone']=true;
                if(element.typeAttributes){

                }

            }
            
            
            
        });
        console.log('Data JSON'+JSON.stringify(tileData));

        



    }

}