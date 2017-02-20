"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const CheckList_Model_1 = require("./models/CheckList.Model");
let AppComponent = class AppComponent {
    constructor(zone) {
        this.zone = zone;
    }
    ngOnInit() {
        CheckList_Model_1.CheckList.init((model, collection) => {
            this.checkLists = collection;
            this.zone.run(() => { });
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
        this.checkLists = CheckList_Model_1.CheckList.find({ id: "588fc6e886f662f9917b50f0" });
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/app.component.html'
    }),
    __metadata("design:paramtypes", [core_1.NgZone])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map