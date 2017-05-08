import {UUID} from 'angular2-uuid/index'
import * as _ from 'lodash';
import {ModelInterface} from "../interfaces/Model.Interface";
import {StoreInterface} from "../interfaces/Store.Interface";
import {Store} from "../services/Store";
import {MessageInterface} from "../Interfaces/Message.Interface";

declare var io: any;

export class Model implements ModelInterface{

    protected _name: string;
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

    constructor(name: string, attributes: Object){
        this._name = name;
        this.attributes = attributes;
        this.dataStore = new Store('db');
        this.connect("https://surecheckapi.herokuapp.com");
    }



    public hasAccessToEvery(...rolesTypes) {
        return _.each(rolesTypes, (role)=> {
            return this.user.roles.indexOf(role.type);
        });
    }

    public hasAccessToAny(...rolesTypes) {
        return _.each(rolesTypes, (role)=> {
            return this.user.roles.indexOf(role.type);
        });
    }

    connect()
    connect(url: string){
        if(!this.connected && !this.connecting) {

            console.log("Starting up:");
            console.log("Attempting to connect to:", this.connectionUrl);

            if(url) this.connectionUrl = url;

            let options = {
                transports: ['polling', 'websocket'],
                allowUpgrade: true
            };


            if (io.socket.isConnected()) {
                io.socket.disconnect();
            }

            if(this.connected || this.connecting){
                return;
            }

            this.socket = io.sails.connect(this.connectionUrl, options);
            this.connecting = true;

            this.socket.on('connect', () => {
                console.log("Running in online mode:");
                console.log("connected to:", this.connectionUrl);
                this.connected = true;
                this.connecting = false;
                dispatchEvent(new Event("socket.connected");

            });

            this.socket.on('disconnect', () => {
                console.log("Running in offline mode:");
                console.error("disconnected from:", this.connectionUrl);
                this.connected = false;
                this.connecting = false;
                dispatchEvent(new Event("socket.disconnected");
            });

        }else{
            console.log("Already connected");
        }

    }

    get networkStatus(){
        return this.connected;
    }

    disconnect(){
        if(io.socket.isConnected()){
            io.socket.disconnect();
            this.connected = false;
            console.log("disconnected from:", this.connectionUrl);
        }
    }

    init(cb) : void{
        console.log("Init:", this._name);
        this.collection = this.dataStore.read(this._name);
        var self = this;

        if(this.socket.isConnected()){
            console.log("isConnected");
        }

        //this.read();

        console.log("Listening to:", this._name);
        this.socket.on(this._name, (model) => {
            console.log("On:", this._name, model);
            switch(model.verb){
                case "created":
                    this.collection.push(model.data);
                    break;
                case "updated":
                    _.extend(_.find(this.collection, function(o) { return o.id == model.id; }), model.data);
                    break;
                case "destroyed":
                    _.remove(this.collection, function(object){ return object.id == model.id; });
                    break;
            }
             this.dataStore.write(this._name, this.collection);
            //console.log("On Change", self.collection);
            dispatchEvent(new CustomEvent(this._name, {detail: this.collection}));

            cb(model, this.collection);
        });

        //this.subscribe(cb);

        cb({}, this.collection);

    };

    create(object: Object) : this;
    create(object: Object) : this | Object{
        this.connect();

        console.log("create:", this._name);

        for(let property in object){
            for(var attribute in this.attributes){
                if(object[attribute] == null) object[attribute] = this.attributes[attribute]['defaultsTo'];
            }
        }

        //object.id = <string>this.autoIncrement++;
        object.id = UUID.UUID();
        object.createdAt = _.now();
        object.updatedAt = _.now();
        object.upStream = true;

        this.collection = this.dataStore.read(this._name);
        //console.log("create read", this.collection);
        this.collection.push(object);
        //console.log("create push", this.collection);
        this.dataStore.create(this._name, this.collection);
        //console.log("create create", this.collection);
        this.syncRemote(object);
        this.afterCreate(object);
        return this;
    }

    syncRemote(object: Object) {
        console.log("syncRemote:", this._name);

    }

    afterCreate(object: Object) {

    }

    read(): void
    read(cb): any[] {
        console.log("read:", this._name);
        this.collection = this.dataStore.read(this._name);
        this._afterRead(cb);
        return this.collection;
    }

    /**
     * Read remote storage and sync
     * @param cb
     * @private
     */
    _afterRead(cb){
        console.log("_afterRead:", this._name);
        this.socket.get('/' + this._name, (res) => {
            _.each(res, (model)=>{
                var object = _.find(this.collection, (o) => { return o.id == model.id; });
                if(object){
                    _.extend(object, model.data);
                }else{
                    this.collection.push(model);
                }
            });
            this.dataStore.write(this._name, this.collection);
            //console.log("Read:", this._name, "collection", this.collection);
            if(cb) cb(res, this.collection);
        });
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

    find(by: Object): any[]
    find(by: Object, cb): any[] {
        this.connect();
        console.log("find:", this._name, "by:", by);
        this.collection = this.dataStore.read(this._name);
        this.socket
          .get('/' + this._name + '?where=' + JSON.stringify(by), (res) => {
            _.each(res, (model)=>{
                var object = _.find(this.collection, (o) => { return o.id == model.id; });
                if(object){
                    _.extend(object, model.data);
                }else{
                    this.collection.push(model);
                }
            });
            this.dataStore.write(this._name, this.collection);

              let result = (by == {} ? this.collection : _.filter(this.collection, by));
              //console.log("find:", result);

            if(cb) cb(result, this.collection);
        });

       let result = (by == {} ? this.collection : _.filter(this.collection, by));
       //console.log("find:", result);
       return result;
    }

    contains(key: string, value: string)
    contains(key: string, value: string, cb) {
        this.connect();
        console.log("contains:", this._name, "key:", key, "value:", value, '/' + this._name + '?where={"' + key + '":{"contains":"' + value + '"}}');
        this.collection = this.dataStore.read(this._name);

        this.socket
          .get('/' + this._name + '?where={"' + key + '":{"contains":"' + value + '"}}', (res) => {
              console.log("contains remote result:", res);

              this.collection = this.dataStore.read(this._name);

              this.compareAndUpdateCollection(this.collection, res);
              // _.each(res, (model)=>{
              //     var object = _.find(this.collection, (o) => { return o.id == model.id; });
              //     if(object){
              //         _.extend(object, model.data);
              //     }else{
              //         this.collection.push(model);
              //     }
              // });

              //console.log("this.collection:", this.collection);

              this.dataStore.write(this._name, this.collection);

              let result = (value == '' ? this.collection : _.filter(this.collection, function(obj) {
                  return obj[key].indexOf(value) !== -1;
              }));
              //console.log("result:", result, key);

              if(cb) cb(result, res);
          });

        var result = (value == '' ? this.collection : _.filter(this.collection, function(obj) {
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
                object
            })
        });

        return this;
    }

    skip(skipTo: number, amount: number) {
        return {skipTo: skipTo, amount: amount};
    }

    subscribe(): void
    subscribe(cb): void {
        console.log("Listening to:", this._name);
        this.socket.on(this._name, (model) => {
            console.log("On:", this._name, model);
            switch(model.verb){
                case "created":
                    this.collection.push(model.data);
                    break;
                case "updated":
                    _.extend(_.find(this.collection, function(o) { return o.id == model.id; }), model.data);
                    break;
                case "destroyed":
                    _.remove(this.collection, function(object){ return object.id == model.id; });
                    break;
            }
            console.log("On Change:", model);
            //console.log("On Change", self.collection);
            cb(model, this.collection);
        });
    }

    exec(){

    }

    compareAndUpdateCollection(currentCollection, collectionAdditions){
        _.each(collectionAdditions, (model)=>{
            var object = _.find(currentCollection, (o) => { return o.id == model.id; });
            if(object){
                _.extend(object, model.data);
            }else{
                currentCollection.push(model);
            }
        });
    }



}