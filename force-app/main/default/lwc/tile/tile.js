import { api, LightningElement } from 'lwc';

export default class Tile extends LightningElement {
    @api backgroundColor = "blue";
    @api color = "black";
    @api heading = "heading...";
    @api count = "count...";

    renderedCallback() {
        this.template.querySelector("div").style.backgroundColor = this.backgroundColor;
        const elements = this.template.querySelectorAll("p");
        elements.forEach((ele) => ele.style.color = this.color);
    }
}