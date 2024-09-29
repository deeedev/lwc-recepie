public with sharing class CustomLookupController {
    @AuraEnabled(cacheable=true)
    public static List<LookupResult> searchRecords(String objectApiName, String searchFields, String searchTerm) {
        String searchQuery = 'SELECT Id, ' + searchFields + ' FROM ' + objectApiName +
                             ' WHERE ' + searchFields + ' LIKE \'%' +searchTerm+ '%\' LIMIT 10';

        List<SObject> records = Database.query(searchQuery);
        List<LookupResult> results = new List<LookupResult>();
        for (SObject record : records) {
            LookupResult res = new LookupResult();
            res.id = (String)record.get('Id');
            res.name = (String)record.get(searchFields);
            results.add(res);
        }
        return results;
    }

    public class LookupResult {
        @AuraEnabled public String id { get; set; }
        @AuraEnabled public String name { get; set; }
    }
}