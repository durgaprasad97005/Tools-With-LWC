public with sharing class CryptoUtility {

    // Wrapper class for storing the data of the coins
    public class CoinData {
        @AuraEnabled public String id;
        @AuraEnabled public String symbol;
        @AuraEnabled public String name;
        @AuraEnabled public Decimal current_price;
        @AuraEnabled public Double price_change_percentage_24h;
        @AuraEnabled public Decimal market_cap;
    }

    // Wrapper class for storing the price of coins
    public class PricePoint {
        @AuraEnabled public List<List<Decimal>> prices;
    }

    // Retrieves the top 5 Crypto coins data
    @AuraEnabled(cacheable=true)
    public static List<CoinData> getCryptoData() {
        HTTP http = new HTTP();

        // Used Named credential in the callout url in the setEndpoint() method
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint('callout:CoinGecko_Named_Credential_2/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1');
        HttpResponse response;
        
        // Hanlding API error gracefully
        try {
            response = http.send(request);
        } catch(CalloutException e) {
            // callout exception
            System.debug('Callout error: ' + e.getMessage());
        } catch(Exception e) {
            // All other exceptions
            System.debug('An unexpected error occured: ' + e.getMessage());
        }

        String result = response.getBody();
        List<CoinData> coinDataList = (List<CoinData>) JSON.deserialize(result, List<CoinData>.class);

        return coinDataList;
    }

    @AuraEnabled(cacheable=true)
    public static PricePoint getCoinPrice(string coin) {
        HTTP http = new HTTP();

        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint('callout:CoinGecko_Named_Credential_2/coins/' + coin + '/market_chart?vs_currency=usd&days=7');
        HttpResponse response;

        // Handling API errors gracefully
        try {
            response = http.send(request);
        } catch(CalloutException e) {
            // callout exception
            System.debug('Callout Error: ' + e.getMessage());
        } catch(Exception e) {
            // All other exceptions
            System.debug('An unexpected error occured: ' + e.getMessage());
        }

        String result = response.getBody();
        PricePoint coinPriceList = (PricePoint) JSON.deserialize(result, PricePoint.class);

        return coinPriceList;
    }
}