import { Component, OnInit } from '@angular/core';
import { CheckList } from './models/CheckList.Model'

@Component({
    selector: 'my-app',
    template: `
                <section class="container"  >
                
                    <div class="row wrapper border-bottom white-bg page-heading">
                      <div class="col-lg-12">
                        <h2>Check Lists</h2>
                        <ol class="breadcrumb">
                          <li>
                            <a href="/">Home</a>
                          </li>
                          <li>
                            <a class="active" href="/checklists">Check Lists</a>
                          </li>
                        </ol>
                      </div>
                    </div>
                
                    <div class="well" >
                      <div class="list-group " >
                
                        <a [hidden]="!checkLists.length" *ngFor="let checkList of checkLists" href="#/checklist/{{checkList.id}}" class="list-group-item clearfix"   >
                          <span class="col-xs-2 col-sm-1">
                            <img height="40" src="images/checklist-color2.png">
                          </span>
                          <span class="col-xs-10 col-sm-11">
                            <h5  >{{checkList.name}}</h5>
                          </span>
                        </a>
                
                      </div>
                      
                
                      <div class="clearfix"></div>
                    </div>
                
                </section>`
})
export class ChecksComponent implements OnInit{

    public checks: {};

    constructor(){
    }

    ngOnInit () {

        CheckList.create({
            name: "Personal Hygiene",
            checks: ["58530d487f3cb5110007aaec", "58530d49882ee3110090a46e"]
        }).create({
            name: "Personal Hygiene 2",
            checks: ["58530d487f3cb5110007aaec", "58530d49882ee3110090a46e"]
        }).create({
            name: "Personal Hygiene 3",
            checks: ["58530d487f3cb5110007aaec", "58530d49882ee3110090a46e"]
        }).create({
            name: "Employee Hygeine",
            checks: ["58530d487f3cb5110007aaec", "58530d49882ee3110090a46e"]
        });
          //  .destroy("1");
        //this.checkLists =
        this.checks = CheckList.find({'inProgress': false});


        //this.checkLists = [CheckList.findOne("1")];
    }

}
