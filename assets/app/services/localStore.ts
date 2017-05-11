import {UUID} from 'angular2-uuid/index'
import * as _ from 'lodash';
import {ModelInterface} from "../interfaces/Model.Interface";
import {StoreInterface} from "../interfaces/Store.Interface";
import {Store} from "../services/Store";
import {MessageInterface} from "../Interfaces/Message.Interface";
import * as moment from "moment";
import * as mongodb from "mongodb";
import {Session} from "./Session"

export class localStore implements ModelInterface{

    private _name: string;
    private attributes: any;
    private syncAllData: boolean = false;
    private attemptRemoteAttributes: boolean = false;
    private collection: any[] = [];
    private results: any[] = [];
    private autoIncrement: number = 0;
    private dataStore: Store;
    private messageStore: MessageInterface;
    private socket: any;

    private syncing: boolean = false;
    private connectionUrl: any;
    private connected: boolean = false;
    private connecting: boolean = false;
    private connectionInterval: number = 5;
    private user = null;

    constructor(name: string, attributes: Object){

        this._name = name;
        this.attributes = attributes;

        this.dataStore = new Store('db');

        for(let attribute in this.attributes){
            if(this[attribute] == null) this[attribute] = this.attributes[attribute]['defaultsTo'];
        }

    }

    public authenticate(email, password){
        let user = {identity: email, password: password};

        console.log("Authenticated successfully");
        Session.setVar('user', user);
        Session.isAuthenticated = true;

    }


    create(object: Object) : this;
    create(object: Object, cb) : this;
    create(object: Object, cb?) : this | Object{
        console.log("create:", this._name);

        for(let property in object){
            for(let attribute in this.attributes){
                if(object[attribute] == null) object[attribute] = this.attributes[attribute]['defaultsTo'];
            }
        }

        //object.id = <string>this.autoIncrement++;
        object['upStream'] = {
            id: UUID.UUID(),
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
        };

        this.collection = this.dataStore.read(this._name);
        console.log("create read", this.collection);
        this.collection.push(object);
        //console.log("create push", this.collection);
        this.dataStore.write(this._name, this.collection);
        //this.dataStore.create(this._name, object.id, object);
        console.log("create", object);

        if(cb) cb();
        //this._afterCreate(object);
        return this.collection;
    }

    _afterCreate(object: Object) {
        console.log("_afterCreate:", this._name);
        this.socket
            .post('/' + this._name, object, (res) => {
                console.log("remote create:", res);
                this.compareAndUpdateSyncCollection(this.collection, [res.data]);
            });
    }

    read(): void
    read(cb?): any[] {
        console.log("read:", this._name);
        this.collection = this.dataStore.read(this._name);
        return this.collection;
    }

    update(id: any, object: Object) {

        // if(this.attributes){
        //     let newObject = new this.attributes;
        //     for(let property in object){
        //         for(var attribute in this.attributes){
        //             if(object[attribute] == null) {
        //                 newObject[attribute] = this.attributes[attribute]['defaultsTo'];
        //             }else if(object[attribute]){
        //                 newObject[attribute] = object[attribute];
        //             }
        //         }
        //     }
        // }

        object['updatedAt'] = _.now();
        console.log("update:", object);
        return _.extend(_.find(this.collection, function(o) { return o.id == id; }), object);
    }

    afterUpdate(object: Object) {

    }

    destroy(id: string) {
        if(!id) {
            console.error("No id passed");
            return false;
        }
        console.log("beforeDestroy:", this.collection);
        _.remove(this.collection, function(object){
            return object.id == id;
        });
        this.afterDestroy();
        console.log("destroy:", this.collection);
        return true;
    }

    afterDestroy() {

    }

    findOne(id: string) {
        console.log("findOne:", );
        return _.find(this.collection, function(object) { return object.id == id; });
    }

    find(by: Object): any[];
    find(by: Object, cb?): any[] {
        console.log("find:", this._name, "by:", by);
        this.collection = this.dataStore.read(this._name);

        let result = (by == {} ? this.collection : _.filter(this.collection, by));
        console.log("find:", result);
        return result;
    }

    contains(key: string, value: string);
    contains(key: string, value: string, cb?) {

        console.log("contains:", this._name, "key:", key, "value:", value, '/' + this._name + '?where={"' + key + '":{"contains":"' + value + '"}}');
        this.collection = this.dataStore.read(this._name);

        let result = (value == '' ? this.collection : _.filter(this.collection, function(obj) {
            return obj[key].indexOf(value) !== -1;
        }));

        console.log("contains local result:", result);

        return result;
    }

    sort(byAttribute: string, order: string) {
        return {sort: byAttribute, order: order};
    }

    limit(by: number) {
        return {limit: by};
    }

    populate(collectionsToPopulate: any[]) {
        /**
         * Search all for the collections needed then find and map the ids back to the requested collection
         */
        _.each(this.collection, function (object) {
            _.every(collectionsToPopulate, function () {

            })
        });

        return this;
    }

    skip(skipTo: number, amount: number) {
        return {skipTo: skipTo, amount: amount};
    }

    exec();
    exec(cb);
    exec(cb?) {
        if(Session.isAuthenticated) {
            this.user = Session.getVar('user');
        }else{
            console.error("Forbidden");
            return false;
        }
        if(cb) cb();
    }

    init(cb) : void{
        console.log("Init:", this._name);
        this.collection = this.dataStore.read(this._name);
        var self = this;

        //this.read();

        dispatchEvent(new CustomEvent(this._name, {detail: this.collection}));

        //this.subscribe(cb);

        cb({}, this.collection);

    };



    compareAndUpdateCollection(currentCollection, collectionAdditions){
        _.each(collectionAdditions, (model)=>{
            let object = _.find(currentCollection, (o) => { return o.id == model.id; });
            if(object){
                _.extend(object, model.data);
            }else{
                currentCollection.push(model);
            }
        });
    }

    compareAndUpdateSyncCollection(currentCollection, collectionAdditions){
        _.each(collectionAdditions, (model)=>{
            let object = _.find(currentCollection, (o) => {
                if(model.hasOwnProperty('upStream') && o.hasOwnProperty('upStream')) {
                    return o.upStream.id == model.upStream.id;
                }else{
                    return;
                }
            });
            if(object){
                _.extend(object, model.data);
                //_.omit(object, "upStream");
            }else{
                currentCollection.push(model);
            }
        });
    }

    // public hasAccessToEvery(...rolesTypes) {
        //     return _.each(rolesTypes, (role)=> {
        //         return this.user.roles.indexOf(role.type);
        //     });
        // }
        //
        // public hasAccessToAny(...rolesTypes) {
        //     return _.each(rolesTypes, (role)=> {
        //         return this.user.roles.indexOf(role.type);
        //     });
        // }




}