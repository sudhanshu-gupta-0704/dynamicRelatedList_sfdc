/*******************************************************************************************
* @Name         DRL_ApexVariablesTest 
* @Date         August 7,2022 
* @Description  Test Class for DRL_ApexVariables
*******************************************************************************************/
/* MODIFICATION LOG
* Version          Developer          Date               Description
*-------------------------------------------------------------------------------------------
*  1.0              Sudhanshu        August 7,2022       Initial Creation                                                      
*******************************************************************************************/
@isTest
public without sharing class DRL_ApexVariablesTest {


   /**************************************************************************************
    * @Description  Test Method to check DRL_ApexVariable
    * @Param		String - Key string, Map<String, Object> - Map of Arguments
    * @Return       Object - Any Datatype or List of Datatypes can be returned.   
    /* MODIFICATION LOG
    * Version          Developer          Date               Description
    *-------------------------------------------------------------------------------------------
    *  1.0              Sudhanshu        August 7,2022       Initial Creation                                                      
    *******************************************************************************************/ 
   @isTest
 static void testApexVariableMethod(){   
    Callable extension = (Callable) Type.forName('DRL_ApexVariables').newInstance();
    String sRetType=(String)extension.call('Notes_Attachments_FilterCondition1', new Map<String, Object>());
 }
}