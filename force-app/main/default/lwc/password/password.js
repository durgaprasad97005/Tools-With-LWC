import { LightningElement } from 'lwc';

export default class Password extends LightningElement {
    showPassword = true;
    inputType = "password";
    iconName = "utility:preview";
    hide = "slds-hidden";
    password = "";
    val = "";

    toggleIcon() {
        if(this.showPassword) {
            this.showPassword = false;
            this.inputType = "text";
            this.iconName = "utility:hide";
        } else {
            this.showPassword = true;
            this.inputType = "password";
            this.iconName = "utility:preview";
        } 
    }

    copyTheContent() {
        if(this.password !== "") {
            navigator.clipboard.writeText(this.password);
            this.hide = "slds-visible";
            setTimeout(() => this.hide = "slds-hidden", 2000);
        }
    }

    handleChange(event) {
        this.password = event.target.value;
    }
}