/*******************************************************************************************
* @Name         DRL_ApexVariables 
* @Date         August 7,2022 
* @Description  This class contains the query dynamic parameters for 
                Dynamic Related List Component
*******************************************************************************************/
/* MODIFICATION LOG
* Version          Developer          Date               Description
*-------------------------------------------------------------------------------------------
*  1.0              Vinky        August 7,2022       Initial Creation                                                      
*******************************************************************************************/
public with sharing class DRL_ApexVariables implements Callable {
    
    /**************************************************************************************
    * @Description  This method will return the String to be replaced with in SOQL Query
    * @Param		String - Key string, Map<String, Object> - Map of Arguments
    * @Return       Object - Any Datatype or List of Datatypes can be returned.   
    /* MODIFICATION LOG
    * Version          Developer          Date               Description
    *-------------------------------------------------------------------------------------------
    *  1.0              Vinky        August 7,2022       Initial Creation                                                      
    *******************************************************************************************/ 
    public Object call(String action, Map<String, Object> args){
        //Check the Action Name
        if(action == 'Notes_Attachments_FilterCondition1'){
            return 'CreatedBy.Profile.Name IN (\'Minimum Access - Salesforce\')';
        } else{
            throw new CalloutException('Method not implemented');
        }
    }
}