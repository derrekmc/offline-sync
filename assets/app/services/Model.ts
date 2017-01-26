import {UUID} from 'angular2-uuid/index'
import * as _ from 'lodash';
import {ModelInterface} from "../interfaces/Model.Interface";
import {StoreInterface} from "../interfaces/Store.Interface";
import {MessageInterface} from "../Interfaces/Message.Interface";
import {Injectable} from "@angular/core";

@Injectable();
export class Model implements ModelInterface{

    protected _name: string;
    private attributes: any;
    private syncAllData: boolean = false;
    private attemptRemoteAttributes: boolean = false;
    private collection: any[];
    private autoIncrement: number = 0;
    private dataStore: StoreInterface;
    private messageStore: MessageInterface;

    //constructor(name: string, attributes: Object)
    constructor(name: string, attributes: Object){
        this._name = name;
        this.attributes = attributes;
        this.collection = [];

        console.log(this.dataStore);
    }

    create(object: Object) : this;
    create(object: Object) : this | Object{

        for(let property in object){
            for(var attribute in this.attributes){
                if(object[attribute] == null) object[attribute] = this.attributes[attribute]['defaultsTo'];
            }
        }

        object.id = <string>this.autoIncrement++;
        object.id = UUID.UUID();
        object.createdAt = _.now();
        object.updatedAt = _.now();

        console.log("create:", object);

        this.collection.push(object);
        this.afterCreate(object);

        return this;
    }

    afterCreate(object: Object) {

    }

    read() {
        return this.collection;
    }

    update(object: Object) {
        object.updatedAt = _.now();
        console.log("update:", object);
        return _.extend(_.find(this.collection, function(o) { return o.id == id; }), object);
    }

    afterUpdate(object: Object) {

    }

    destroy(id: string) {
        console.log("beforeDestroy:", this.collection);
        _.remove(this.collection, function(object){
            return object.id == id;
        });
        console.log("destroy:", this.collection);
        return true;
    }

    afterDestroy(object: Object) {

    }

    findOne(id: string) {
        console.log("findOne:", );
        return _.find(this.collection, function(object) { return object.id == id; });
    }

    find(by: Object): any[] {
        console.log("by:", by);
        let result = _.filter(this.collection, by);
        console.log("find:", result);
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
        // _.each(this.collection, function (object) {
        //     _.every(collectionsToPopulate, function () {
        //         object
        //     })
        // })
    }

    skip(skipTo: number, amount: number) {
        return {skipTo: skipTo, amount: amount};
    }

    subscribe() {
        return;
    }



}