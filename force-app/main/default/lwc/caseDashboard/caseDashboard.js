import { LightningElement, track, wire } from 'lwc';
import getTotalCasesCount from '@salesforce/apex/CustomCaseController.getTotalCasesCount';
import getCasesCountByStatus from '@salesforce/apex/CustomCaseController.getCasesCountByStatus';
import getCasesCountByPriority from '@salesforce/apex/CustomCaseController.getCasesCountByPriority';
import getCasesCreatedThisMonth from '@salesforce/apex/CustomCaseController.getCasesCreatedThisMonth';
import getCasesCountByOrigin from '@salesforce/apex/CustomCaseController.getCasesCountByOrigin';

// Array to define columns in the table
const columns = [
    { label: 'Cases Origin', fieldName: 'Origin' },
    { label: 'Count', fieldName: 'Count', type: 'number' }
];

export default class CaseDashboard extends LightningElement {
    // Date and columns for the table
    @track tableData = [
        { Origin: 'Phone', Count: 0 },
        { Origin: 'Email', Count: 0 },
        { Origin: 'Web', Count: 0 }
    ];
    columns = columns;

    @track tiles = [
        {id: 0, heading: "Total Cases", count: 0, backgroundColor: "#066AFE", color: "white"},
        {id: 1, heading: "Open Cases", count: 0, backgroundColor: "#01C3B3", color: "white"},
        {id: 2, heading: "Closed Cases", count: 0, backgroundColor: "#3BA755", color: "white"},
        {id: 3, heading: "High Priority Cases", count: 0, backgroundColor: "#BA0517", color: "white"},
        {id: 4, heading: "Medium Priority Cases", count: 0, backgroundColor: "#FCC003", color: "black"},
        {id: 5, heading: "Low Priority Cases", count: 0, backgroundColor: "#06A59A", color: "white"},
        {id: 6, heading: "Cases This Month", count: 0, backgroundColor: "#022AC0", color: "white"}
    ];

    // Total Cases
    @wire(getTotalCasesCount) 
        totalCases({ data, error }) {
            if(data !== undefined) {
                this.tiles[0].count = data;
            }
        }

    // Total Open Cases
    @wire(getCasesCountByStatus, {status: 'New'})
        totalOpenCases({ data, error }) {
            if(data !== undefined) {
                this.tiles[1].count = data;
            }
        }

    // Total Closed Cases
    @wire(getCasesCountByStatus, {status: 'Closed'})
        totalClosedCases({data, error}) {
            if(data !== undefined) {
                this.tiles[2].count = data;
            }
        }

    // Total High Priority Cases
    @wire(getCasesCountByPriority, {priority: 'High'})
        totalHighPriorityCases({data, error}) {
            if(data !== undefined) {
                this.tiles[3].count = data;
            }
        }

    // Total Medium Priority Cases
    @wire(getCasesCountByPriority, {priority: 'Medium'}) 
        totalMediumPriorityCases({data, error}) {
            if(data !== undefined) {
                this.tiles[4].count = data;
            }
        }

    // Total Low Priority Cases
    @wire(getCasesCountByPriority, {priority: 'Low'}) 
        totalLowPriorityCases({data, error}) {
            if(data !== undefined) {
                this.tiles[5].count = data;
            }
        }

    // Total Cases Created This Month
    @wire(getCasesCreatedThisMonth) 
        totalCreatedCasesCountThisMonth({data, error}) {
            if(data !== undefined) {
                this.tiles[6].count = data;
            }
        }

    // Total Cases By Phone
    @wire(getCasesCountByOrigin, {origin: 'Phone'}) 
        totalCasesByPhone({data, error}) {
            if(data !== undefined) {
                this.tableData[0].Count = data;
                this.tableData = [...this.tableData];
            }
        }

    // Total Cases By Email
    @wire(getCasesCountByOrigin, {origin: 'Email'}) 
        totalCasesByEmail({data, error}) {
            if(data !== undefined) {
                this.tableData[1].Count = data;
                this.tableData = [...this.tableData];
            }
        }

    // Total Cases By Web
    @wire(getCasesCountByOrigin, {origin: 'Web'})
        totalCasesByWeb({data, error}) {
            if(data !== undefined) {
                this.tableData[2].Count = data;
                this.tableData = [...this.tableData];
            }
        }
}