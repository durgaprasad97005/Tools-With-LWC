import { LightningElement, api } from 'lwc';

export default class DigitalClock extends LightningElement {
    // Public API
    @api showSeconds = false; // whether to display seconds
    @api hour12 = false;     // 12-hour (true) or 24-hour (false) format
    @api timeZone;           // optional IANA time zone string, e.g. 'America/Los_Angeles'

    // Reactive property used by the template
    time = '';

    intervalId;
    timeoutId;

    connectedCallback() {
        // initial render
        this.updateTime();

        // choose tick interval: every second when showing seconds, otherwise every minute
        const tickMs = this.showSeconds ? 1000 : 60000;

        if (this.showSeconds) {
            // start regular interval immediately
            this.intervalId = setInterval(() => this.updateTime(), tickMs);
        } else {
            // align the first update to the start of the next minute, then set interval
            const now = new Date();
            const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
            this.timeoutId = setTimeout(() => {
                this.updateTime();
                this.intervalId = setInterval(() => this.updateTime(), tickMs);
            }, msToNextMinute);
        }
    }

    disconnectedCallback() {
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
    }

    updateTime() {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: this.hour12
        };
        if (this.showSeconds) {
            options.second = '2-digit';
        }
        if (this.timeZone) {
            options.timeZone = this.timeZone;
        }

        // Use user's locale by passing undefined
        this.time = now.toLocaleTimeString(undefined, options);
    }
}