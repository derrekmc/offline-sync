import { Component, OnInit, NgZone } from '@angular/core';
import { CheckList } from './models/CheckList.Model'
import { Observable } from "rxjs/Rx";

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent implements OnInit{

    public checkLists: any[];

    constructor(public zone: NgZone) {

    }

    ngOnInit () {

        CheckList.init((model, collection) => {
            this.checkLists = collection;
            this.zone.run(()=>{})
        });

        // CheckList.create({
        //     name: "Offline Creation Personal Hygiene",
        //     checks: ["58530d487f3cb5110007aaec", "58530d49882ee3110090a46e"],
        //     id: "123"
        // }).create({
        //     name: "Offline Creation Personal Hygiene 2",
        //     checks: ["58530d487f3cb5110007aaec", "58530d49882ee3110090a46e"]
        // }).create({
        //     name: "Offline Creation Personal Hygiene 3",
        //     checks: ["58530d487f3cb5110007aaec", "58530d49882ee3110090a46e"],
        //     inProgress: true
        // }).create({
        //     name: "Offline Creation Employee Hygeine",
        //     checks: ["58530d487f3cb5110007aaec", "58530d49882ee3110090a46e"]
        // })//.destroy("0");

        this.checkLists = CheckList.find({id: "588fc6e886f662f9917b50f0"});



    }

}
