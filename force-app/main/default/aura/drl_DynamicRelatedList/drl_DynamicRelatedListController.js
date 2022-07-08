({
    listButtonClicked : function(component, event, helper) {
        const recordId = component.get('v.recordId');
        var payload = event.getParam('payLoad');
        try{
        $A.createComponent(
            `c:`+payload.componentToCreate, {"recordId" : recordId},
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

    }
})