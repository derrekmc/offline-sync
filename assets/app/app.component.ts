import { Component, OnInit, NgZone, Input } from '@angular/core';
import { CheckList } from './models/CheckList.Model'
import { Observable } from "rxjs/Rx";
import {NgForm} from '@angular/forms';
import {Session} from "./services/Session";
import { Http, Response } from '@angular/http';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent implements OnInit{

    public checkLists: any[];
    @Input search: string;
    check: any = {};
    public connected: boolean = false;

    constructor(public zone: NgZone) {
        this.connected= false;
        CheckList.authenticate("derrekmc@gmail.com", "support123");
    }

    find(value: string){
        if(!value){
            console.error("No id value");
            return;
        }
        let search = (value? {name: value} : {});

        this.checkLists = CheckList.find(search, (result, collection)=>{
            this.checkLists = result;
            this.zone.run(()=>{})
        });
    }

    delete(id: string){
        console.log("id", id);
        CheckList.destroy(id);
    }

    add(value: string){
        let search = (value? {name: value} : {});
        this.checkLists = CheckList.create({name: value}, (result, collection)=>{
            this.checkLists = result;
            this.zone.run(()=>{})
        });
    }

    contains(value: string){
        let search = (value? {name: value} : {});
        this.checkLists = CheckList.contains("name", value , (result, collection)=>{
            this.checkLists = result;
            this.zone.run(()=>{})
        });
    }












    ngOnInit () {

        addEventListener("socket.connected", (event)=>{
            console.log(event.type, "socket.connected!");
            this.connected = true;
            this.zone.run(()=>{})
        });

        addEventListener("socket.disconnected", (event)=>{
            console.log(event.type, "socket.disconnected!");
            this.connected = false;
            this.zone.run(()=>{})
        });

        CheckList.init((model, collection) => {
            console.log("init");
            this.checkLists = collection;
            this.zone.run(()=>{})
        });

        this.checkLists = CheckList.find({});

    }

}
