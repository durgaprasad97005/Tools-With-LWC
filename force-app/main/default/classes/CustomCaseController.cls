public with sharing class CustomCaseController {
    
    // returns total cases count
    @AuraEnabled(cacheable=true)
    public static Integer getTotalCasesCount() {
        return [SELECT COUNT() FROM Case];
    }

    // returns total count of cases by Status
    @AuraEnabled(cacheable=true)
    public static Integer getCasesCountByStatus(String status) {
        return [SELECT COUNT() FROM Case WHERE Status = :status];
    }

    // returns total count of cases by priority
    @AuraEnabled(cacheable=true)
    public static Integer getCasesCountByPriority(String priority) {
        return [SELECT COUNT() FROM Case WHERE Priority = :priority];
    }

    // returns total count of cases in the currect month
    @AuraEnabled(cacheable=true)
    public static Integer getCasesCreatedThisMonth() {
        return [SELECT COUNT() FROM Case WHERE CreatedDate = THIS_MONTH];
    }

    // returns total count of cases by origin
    @AuraEnabled(cacheable=true)
    public static Integer getCasesCountByOrigin(String origin) {
        return [SELECT COUNT() FROM Case WHERE Origin = :origin];
    }
}