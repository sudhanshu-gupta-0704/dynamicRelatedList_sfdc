// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

Map<String, Object> mapInputParams = new Map<String, Object>{
    'relatedListName' => 'Notes_Attachments',
    'recordId' => '0035g000002X3LqAAK'
};
DRL_Controller.getMetadata(mapInputParams);