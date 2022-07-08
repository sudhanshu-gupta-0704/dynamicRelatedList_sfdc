/*******************************************************************************************
* @Name         DRL_ControllerTest 
* @Date         August 7,2022 
* @Description  Test Class for DRL_Controller
*******************************************************************************************/
/* MODIFICATION LOG
* Version          Developer          Date               Description
*-------------------------------------------------------------------------------------------
*  1.0              Vinky        August 7,2022       Initial Creation                                                      
*******************************************************************************************/
@isTest
public without sharing class DRL_ControllerTest {
    
     /**************************************************************************************
    * @Description  This method will setup Test Data for Test Class
    * @Param		None
    * @Return       None
    /* MODIFICATION LOG
    * Version          Developer          Date               Description
    *-------------------------------------------------------------------------------------------
    *  1.0              Vinky        August 7,2022       Initial Creation                                                      
    *******************************************************************************************/ 
    @TestSetup
    static void generateTestData(){
        Account objAc = new Account();
        objAc.Name ='TestAccount';
        insert objAc;
        Contact objCon = new Contact();
        objCon.FirstName ='Test';
        objCon.LastName = 'Contact 1';
        objCon.AccountId = objAc.Id;
        insert objCon;
    }

    /**************************************************************************************
    * @Description  This Method will test the Metadata generation for the DRL List Metadata 
    * @Param		None
    * @Return       None
    /* MODIFICATION LOG
    * Version          Developer          Date               Description
    *-------------------------------------------------------------------------------------------
    *  1.0              Vinky        August 7,2022       Initial Creation                                                      
    *******************************************************************************************/ 
@IsTest
 static void testGetMetadata(){
    User objUser = [Select Id from User Where Profile.Name ='System Administrator' LIMIT 1];
    Test.startTest();
    System.runAs(objUser){
        Map<String, Object> mapInputParams= new Map<String, Object>();
        mapInputParams.put('relatedListName', 'TestClassMetadata');
        DRL_Controller.getMetadata(mapInputParams);
    }
    Test.stopTest();
    
 }
}