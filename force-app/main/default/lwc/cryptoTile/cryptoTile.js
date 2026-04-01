import { api, LightningElement } from 'lwc';

export default class CryptoTile extends LightningElement {
    @api name = "Some coin";
    @api symbol = "sc";
    @api currentPrice = 0.0001;
    @api priceChangePercentage = 0.00000;

    renderedCallback() {
        const ele = this.template.querySelector(".price-percentage-change");

        if(this.priceChangePercentage < 0) {
            ele.classList.add("slds-text-color_error");
        } else {
            ele.classList.add("slds-text-color_success");
        }
    }
}