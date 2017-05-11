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
        this.check = {};
        this.connected = false;
        this.connected = false;
        CheckList_Model_1.CheckList.authenticate("derrekmc@gmail.com", "support123");
    }
    find(value) {
        if (!value) {
            console.error("No id value");
            return;
        }
        let search = (value ? { name: value } : {});
        this.checkLists = CheckList_Model_1.CheckList.find(search, (result, collection) => {
            this.checkLists = result;
            this.zone.run(() => { });
        });
    }
    delete(id) {
        console.log("id", id);
        CheckList_Model_1.CheckList.destroy(id);
    }
    add(value) {
        let search = (value ? { name: value } : {});
        this.checkLists = CheckList_Model_1.CheckList.create({ name: value }, (result, collection) => {
            this.checkLists = result;
            this.zone.run(() => { });
        });
    }
    contains(value) {
        let search = (value ? { name: value } : {});
        this.checkLists = CheckList_Model_1.CheckList.contains("name", value, (result, collection) => {
            this.checkLists = result;
            this.zone.run(() => { });
        });
    }
    ngOnInit() {
        addEventListener("socket.connected", (event) => {
            console.log(event.type, "socket.connected!");
            this.connected = true;
            this.zone.run(() => { });
        });
        addEventListener("socket.disconnected", (event) => {
            console.log(event.type, "socket.disconnected!");
            this.connected = false;
            this.zone.run(() => { });
        });
        CheckList_Model_1.CheckList.init((model, collection) => {
            console.log("init");
            this.checkLists = collection;
            this.zone.run(() => { });
        });
        this.checkLists = CheckList_Model_1.CheckList.find({});
    }
};
__decorate([
    core_1.Input,
    __metadata("design:type", String)
], AppComponent.prototype, "search", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/app.component.html'
    }),
    __metadata("design:paramtypes", [core_1.NgZone])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map