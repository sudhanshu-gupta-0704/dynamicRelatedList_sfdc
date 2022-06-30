public without sharing class DRL_Controller {


 @AuraEnabled(cacheable=true)
 public static Map<String, Object> getMetadata(Map<String, Object> mapInputParams){
    try {
        Map<String, Object> mapOutput = null;
        Map<String, String> mapColumnData = new Map<String, String>();
        List<Map<String, Object>> lstRowData = new List<Map<String, Object>> ();
        List<sObject> lstAllData = new List<sObject>(); 
        if(mapInputParams != Null 
            && !mapInputParams.isEmpty() 
            && mapInputParams.containsKey('relatedListName')){
                String recordID = mapInputParams.containsKey('recordId')?(String)mapInputParams.get('recordId'):null;

                List<DynamicRelatedList__mdt> lstDRLRecs = [SELECT List_Title__c,
                                                                   (SELECT Field_API_Name__c,
                                                                            Related_List_Title__c,
                                                                            Show_In_Related_List__c,
                                                                            Id_Field__c,
                                                                            List_Type_Attribute__c,
                                                                            DynamicRelatedList_Object__r.Object_API_Name__c, 
                                                                            DynamicRelatedList_Object__r.Filter_Condition__c, 
                                                                            List_Cell_Attribute__c, 
                                                                            List_Cell_Datatype__c, 
                                                                            Sequence_In_List__c,
                                                                            Active__c FROM DynamicRelatedList_Fields__r 
                                                                            WHERE Active__c = TRUE 
                                                                            ORDER BY Sequence_In_List__c ASC) 
                                                                    FROM DynamicRelatedList__mdt 
                                                                    WHERE DeveloperName = :(String)mapInputParams.get('relatedListName')];
                if(!lstDRLRecs.isEmpty()){
                    map<String, List<String>> mapObjectFieldMapping = new map<String, List<String>>();
                    map<String, List<DynamicRelatedList_Field__mdt>> mapObjectField = new map<String, List<DynamicRelatedList_Field__mdt>>();
                    map<String, String> mapObjectFilterMapping = new map<String, String>();
                    DynamicRelatedList__mdt objDRLRecord = lstDRLRecs[0];
                    List<DynamicRelatedList_Field__mdt> lstField = objDRLRecord.DynamicRelatedList_Fields__r;
                    for(DynamicRelatedList_Field__mdt objField :lstField){
                        String sObjectName = objField.DynamicRelatedList_Object__r.Object_API_Name__c;
                        if(mapObjectFieldMapping.containsKey(sObjectName)){
                            if(!String.valueOf(objField.Field_API_Name__c).contains('VAL:')){
                            List<String> lstFields = mapObjectFieldMapping.get(sObjectName);                            
                            lstFields.add(objField.Field_API_Name__c);
                            mapObjectFieldMapping.put(sObjectName ,lstFields);
                            }
                            List<DynamicRelatedList_Field__mdt> lstObjFields = mapObjectField.get(sObjectName);
                            lstObjFields.add(objField);
                            mapObjectField.put(sObjectName, lstObjFields);
                        } else{
                            if(!String.valueOf(objField.Field_API_Name__c).contains('VAL:')){
                                mapObjectFieldMapping.put(sObjectName ,new List<String>{objField.Field_API_Name__c});
                                mapObjectFilterMapping.put(sObjectName, objField.DynamicRelatedList_Object__r.Filter_Condition__c);
                            }
                            mapObjectField.put(sObjectName ,new List<DynamicRelatedList_Field__mdt>{objField});
                            
                        }
                    }
                    for(String sObjectName :mapObjectFieldMapping.keySet()){
                        List<String> lstFields = mapObjectFieldMapping.get(sObjectName);
                        String sFields = String.join(lstFields, ',');
                        String sQuery = 'SELECT '+sFields+' FROM '+sObjectName;
                        if(mapObjectFilterMapping.containsKey(sObjectName) && mapObjectFilterMapping.get(sObjectName) != null){
                            sQuery+= ' WHERE '+mapObjectFilterMapping.get(sObjectName);
                        }
                        List<sObject> lstObject = Database.query(sQuery);
                        lstAllData.addAll(lstObject);
                        

                    }
                    System.debug('Data 1: '+lstAllData);
                    if(!lstAllData.isEmpty()){                        
                        for(sObject objData :lstAllData){
                            Map<String, Object> mapRowData = new Map<String, Object>();
                            String sObjectType = String.valueOf(objData.getSObjectType());
                            if(mapObjectField.containsKey(sObjectType)){
                               List<DynamicRelatedList_Field__mdt>  lstFields = mapObjectField.get(sObjectType);
                                for(DynamicRelatedList_Field__mdt objField: lstFields){
                                        String sFieldApiName = objField.Field_API_Name__c;
                                        String sListTitle = objField.Related_List_Title__c;
                                        if(!sFieldApiName.startsWith('VAL:')){
                                            System.debug('Here 1');
                                    
                                    if(!sFieldApiName.contains('.')){
                                        if(objField.Id_Field__c == true){
                                            mapRowData.put('Id' ,  '/'+objData.get(sFieldApiName));
                                        } else{
                                            mapRowData.put(sListTitle ,  objData.get(sFieldApiName));
                                        }    
                                    } else {                                    
                                        Object sData= null;
                                        List<String> lstString = sFieldApiName.split('\\.');
                                        if(lstString.size() == 2){
                                            sData = objData.getSObject(lstString[0]).get(lstString[1]);
                                        } else if(lstString.size() == 3){
                                            sData = objData.getSObject(lstString[0]).getSObject(lstString[1]).get(lstString[2]); 
                                        } else if(lstString.size() == 4){
                                            sData = objData.getSObject(lstString[0]).getSObject(lstString[1]).getSObject(lstString[2]).get(lstString[3]); 
                                        } else if(lstString.size() == 5){
                                            sData = objData.getSObject(lstString[0]).getSObject(lstString[1]).getSObject(lstString[2]).getSObject(lstString[3]).get(lstString[4]); 
                                        }
                                        if(objField.Id_Field__c == true){
                                            mapRowData.put('Id' ,  '/'+sData);
                                        } else{
                                            mapRowData.put(sListTitle ,  sData);
                                        }
                                        
                                    }   
                                } else {
                                    System.debug('Here 2');
                                    mapRowData.put(sListTitle ,  sFieldApiName.replace('VAL:', ''));
                                }                               
                                       
                                }
                                lstRowData.add(mapRowData);
                            }
                           
                        }
                        mapOutput = new Map<String, Object>();
                        mapOutput.put('isSuccess', true);
                        mapOutput.put('columnData', generateColumnData(new Map<String, Object>{ 'fields' => lstField}));
                        mapOutput.put('data', JSON.serialize(lstRowData));
                    }
                   
                }
            }
            return  mapOutput; 
        
    }catch (Exception e) {
        Map<String, Object> mapOutput = new Map<String, Object>();
        mapOutput.put('isSuccess', false);
        mapOutput.put('error', e);
        return  mapOutput;
    }
 }
    public static String getLabelValue(String customLabelName){
        Component.Apex.OutputText opText = new Component.Apex.OutputText();
        opText.expressions.value = '{!$Label.' + customLabelName + '}';
        return String.valueOf(opText.value);
    }

    public static String generateColumnData(Map<String, Object> mapInputParams){
        
        Set<Map<String, Object>> lstColumnData = new Set<Map<String, Object>>();
        Map<Integer, Object> mapSeqencedColumn = new Map<Integer, Object>();
        List<DynamicRelatedList_Field__mdt> lstField = mapInputParams.containsKey('fields')?(List<DynamicRelatedList_Field__mdt>)mapInputParams.get('fields'):null;  
        for(DynamicRelatedList_Field__mdt objField : lstField){
           
                if(objField.Show_In_Related_List__c == true){
                    Map<String, Object> mapColumnData = new Map<String, Object>();
                mapColumnData.put('label',  objField.Related_List_Title__c);
                if(objField.Id_Field__c == true){
                    mapColumnData.put('fieldName',  'Id');
                } else{
                    mapColumnData.put('fieldName',  objField.Related_List_Title__c);
                }
                
                mapColumnData.put('type',  objField.List_Cell_Datatype__c);
                if(objField.List_Cell_Attribute__c != null ){
                    mapColumnData.put('cellAttributes', JSON.deserializeUntyped(objField.List_Cell_Attribute__c));
                }
                if(objField.List_Type_Attribute__c != null ){
                    mapColumnData.put('typeAttributes',  JSON.deserializeUntyped(objField.List_Type_Attribute__c));
                }
                mapSeqencedColumn.put(Integer.valueOf(objField.Sequence_In_List__c), mapColumnData);
            }
            if(!mapSeqencedColumn.isEmpty()){
                Set<Integer> setSortedKeys = mapSeqencedColumn.keySet();
                List<Integer> lstSortedKeys = new List<Integer>();
                lstSortedKeys.addAll(setSortedKeys);
                lstSortedKeys.sort();
                for(Integer iSeqNum : lstSortedKeys){
                    lstColumnData.add((Map<String, Object>)mapSeqencedColumn.get(iSeqNum));
                }

            }
        }
        return JSON.serialize(lstColumnData);
    }
}