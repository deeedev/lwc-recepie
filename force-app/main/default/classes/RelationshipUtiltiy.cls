public class RelationshipUtiltiy{
    //map to hold all relationships at one place. It also saves you lot of iterations.
    //For each object type there will be a list of Relationships between related and relatedTo records.
    public Map<String, List<Relationship>> relationshipMap = new Map<String, List<Relationship>>();

    /** registerRelationship method populate the relationshipMap with related records which later
     * used to resolve the parent-child relationships.**/
    public void registerRelationship(sObject record, sObject relatedTo, Schema.sObjectField relatedToField){
        String sObjectType = record.getSObjectType().getDescribe().getName();

        Relationship rel = new Relationship();
        rel.record = record;
        rel.relatedTo = relatedTo;
        rel.relatedToField = relatedToField;

        if(relationshipMap.containsKey(sObjectType)){
             relationshipMap.get(sObjectType).add(rel);
        }
        else{
             relationshipMap.put(sObjectType, new List<Relationship>{rel});
        }
    }
    /**resolve method helps to resolve the relationship and assign the correct parentId to the child
     * record. It utilise relationshipMap to find the correct references.**/
    public void resolve(String sObjectName){
        for(Relationship rel :relationshipMap.get(sObjectName)){
            rel.record.put(rel.relatedToField, rel.relatedTo.Id);
        }
    }

    /**Inner class establises relationship between child and parent object and contains the information 
    * about the relatedTo fild which binds the parent record.**/
    public class Relationship{
        public sObject record;
        public sObject relatedTo;
        public Schema.sObjectField relatedToField;
    }
}