import { Component, OnInit } from '@angular/core';
import { CheckList } from './models/CheckList.Model'
import { Observable } from "rxjs/Rx";

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent implements OnInit{

    //public checkLists$:Observable<any[]>;
    public checkLists: any[];
    //public dataService: any;

    // constructor(data: SailsMessageService) {
    //     this.dataService = data;
    // }

    ngOnInit () {

        //this.checkLists = this.dataService.get('/checklist');
        //this.checkLists = CheckList.read();

        CheckList.create({
            name: "Personal Hygiene",
            checks: ["58530d487f3cb5110007aaec", "58530d49882ee3110090a46e"]
        }).create({
            name: "Personal Hygiene 2",
            checks: ["58530d487f3cb5110007aaec", "58530d49882ee3110090a46e"]
        }).create({
            name: "Personal Hygiene 3",
            checks: ["58530d487f3cb5110007aaec", "58530d49882ee3110090a46e"],
            inProgress: true
        }).create({
            name: "Employee Hygeine",
            checks: ["58530d487f3cb5110007aaec", "58530d49882ee3110090a46e"]
        }).destroy("0");

        this.checkLists = CheckList.find({'inProgress': false});

        //this.checkLists = [CheckList.findOne("1")];
    }

}
