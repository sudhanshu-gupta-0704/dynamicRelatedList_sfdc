({
    deleteSFRecord: function(component, event, helper){
        var action = component.get("c.deleteRecord");
        action.setParams({ iRecordId :  component.get("v.rowId") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                if(result == 'success'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        message: 'Record Deleted',
                        type: 'success',
                        label: 'Success',
                    });
                    toastEvent.fire();  
                    helper.closeModal(); 
                    helper.refreshData(component,event,helper);
                }
                if(result == 'error'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        type: 'error',
                        message: 'Error Deleting Record',
                        label: 'Success',
                    });
                    toastEvent.fire(); 
                    helper.closeModal(); 
                }
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    editRecord: function(component, event, helper){
        var navService = component.find("navService");
        var rowId = component.get("v.rowId");
        var pageReference = {
                            type: 'standard__recordPage',
                                         attributes: {
                                             "recordId": rowId,
                                             "actionName": "edit"
                                         }
                                     };
        navService.navigate(pageReference);
    },
    getData: function(component, event, helper){
        var object = { 'recordId':  component.get("v.relatedRecordId"), 'relatedListName': component.get("v.relatedListConfig")}
        var action = component.get("c.getMetadata");
        action.setParams({ mapInputParams : object });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                if(result.data){
                    component.set('v.data',JSON.parse(result.data));
                }
                if(result.columnData){
                    component.set('v.columnData',JSON.parse(result.columnData));
                }
                if(result.buttonData){
                    component.set('v.buttonData', eval(result.buttonData));
                }
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    refreshData: function(component, event, helper){
        component.set('v.data',null);
        helper.getData(component, event, helper);
    },    
    openModal: function(component, event, helper){
        component.set("v.isModalOpen",true);

    },
    closeModal: function(component, event, helper){
        component.set("v.isModalOpen",false);
        
    }
})
