({
    onPageReferenceChange : function(component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        component.set("v.relatedRecordId", myPageRef.state.c__relatedRecordId);
        component.set("v.relatedListTitle", myPageRef.state.c__relatedListTitle);
        component.set("v.relatedListConfig", myPageRef.state.c__relatedListConfig);
        component.set("v.backURL", '/'+myPageRef.state.c__relatedRecordId);
    },
    onRender : function(component, event, helper) {
        var isFirstLoad = component.get('v.isFirstLoad');
        if(isFirstLoad){
        helper.getData(component, event, helper);
        component.set('v.isFirstLoad',false);
        }
    } ,
    listButtonClicked : function(component, event, helper) {
        
        const recordId = component.get("v.relatedRecordId");
        var payload = event.target.dataset.component;
        try{
        $A.createComponent(
            `c:`+payload, {"recordId" : recordId},
            function(lwcCmp, status, errorMessage) {
                if (status === "SUCCESS") {
                    var body = component.get("v.body");
                    body.push(lwcCmp);
                    component.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                }
                else if (status === "ERROR") {
                    console.error("Error: " + errorMessage);
                }
            }
        );
        } catch(ex){
            console.log('Exception '+ex)
        }

    },
    handleRowAction: function(component, event, helper) {
        var actionName = event.getParam('action').name;
        var row = event.getParam('row');
        var rowId = row.Id.replace('/','');
        switch (actionName) {
            case 'Delete_Button':
                component.set("v.rowId", rowId);
                helper.openModal(component, event, helper);
                break;
            case 'Edit_Button':
                component.set("v.rowId", rowId);
                helper.editRecord(component, event, helper);
                break;
            default:
        }

    },
    refreshData: function(component, event, helper){
        helper.refreshData(component,event,helper);
    },
    deleteClick: function(component, event, helper){
        helper.deleteSFRecord(component,event, helper);
        
    },
    closeModal: function(component, event, helper){
        helper.closeModal(component, event, helper);
    }

})
