import { LightningElement } from 'lwc';
import Toast from 'lightning/toast';

export default class JobApplicationForm extends LightningElement {
    phoneNumber = "";

    handlePhoneNumberBlur(event) {
        this.phoneNumber = event.target.value;

        if(this.phoneNumber.charAt(0) === '0') {
            event.target.setCustomValidity("Phone number cannot start with zero.");
        } else {
            event.target.setCustomValidity("");
        }
        event.target.reportValidity();
    }

    handleClick() {
        const inputs = [...this.template.querySelectorAll("lightning-input"), this.template.querySelector("lightning-textarea")];
        let showSuccessToast = true;
        
        inputs.forEach((input) => {
            input.reportValidity();
            if(!input.checkValidity()) showSuccessToast = false;
        });

        const config = {
            label: 'Success',
            message: 'Application submitted successfully',
            variant: 'success',
        }

        if(showSuccessToast) {
            Toast.show(config, this);
            inputs.forEach((input) => input.value = "");
        }
    }
}