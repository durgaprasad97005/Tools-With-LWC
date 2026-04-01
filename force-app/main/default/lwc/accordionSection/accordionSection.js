import { api, LightningElement } from 'lwc';

export default class AccordionSection extends LightningElement {
    @api question = "Question?";
    @api answer = "Answer";
    @api showPlus;
    @api name;

    // Getter methods for showing answer and icon
    get showAnswer() {
        return this.showPlus? "slds-hide" : "slds-show";
    }

    get addIcon() {
        return this.showPlus ? "utility:add" : "utility:dash";
    }

    // Event handler method for icon click - passes custom event to the parent
    handleClick() {
        // this.showPlus = !this.showPlus;
        const event = new CustomEvent('iconclick', {
            detail: {
                id: this.name, 
                question: this.question, 
                answer: this.answer, 
                showPlus: !this.showPlus
            }
        });

        this.dispatchEvent(event);
    }
}