import { LightningElement, track } from 'lwc';

export default class FaqAccordion extends LightningElement {
    // FAQs data
    @track faqs = [
        {
            id: 1,
            question: "What is a Lightning Web Component (LWC)?",
            answer: "Lightning Web Components is a modern Salesforce UI framework built using standard web technologies like HTML, JavaScript, and CSS. It helps developers create fast, reusable, and responsive components that run efficiently in the Lightning Experience and Salesforce mobile app.",
            showPlus: true
        },
        {
            id: 2,
            question: "How is LWC different from Aura Components?",
            answer: "LWC is based on native web standards and offers better performance, simpler syntax, and improved developer experience compared to Aura Components. It reduces framework overhead and provides faster rendering and easier debugging.",
            showPlus: true
        },
        {
            id: 3,
            question: "Can Lightning Web Components call Apex methods?",
            answer: "Yes, LWCs can interact with Apex methods using the @wire decorator for reactive calls or imperative calls for event-driven actions. This allows components to fetch, update, or process Salesforce data securely from the server.",
            showPlus: true
        },
        {
            id: 4,
            question: "How can data be passed between LWC components?",
            answer: "Data can be passed from parent to child using public properties (@api) and from child to parent using custom events. This enables proper component communication while maintaining encapsulation and reusability.",
            showPlus: true
        },
        {
            id: 5,
            question: "Where can Lightning Web Components be used in Salesforce?",
            answer: "LWCs can be used in Lightning App Builder pages, record pages, home pages, Experience Cloud sites, quick actions, and Flow screens. This flexibility allows developers to build consistent UI experiences across different Salesforce interfaces.",
            showPlus: true
        }
    ];

    openOnlyOneFaq = false;

    // Event handler method for Toggle
    handleToggle(event) {
        this.closeAllSections();
        this.openOnlyOneFaq = event.target.checked;
    }

    // Re-usable method to close all open sections
    closeAllSections() {
        this.faqs = this.faqs.map((faq) => ({...faq, showPlus: true}));
    }

    // Event handler method for the icon click
    handleIconClick(event) {
        const activeSectionId = event.target.name;

        if(this.openOnlyOneFaq) 
            this.closeAllSections();

        // this.faqs = this.faqs.map((faq) => {
        //     if(faq.id == activeSectionId) 
        //         return event.detail;
            
        //     return faq;
        // });

        this.faqs.splice(event.detail.id-1, 1, event.detail);
    }
}