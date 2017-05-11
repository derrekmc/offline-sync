import { StoreInterface } from "../interfaces/Store.Interface";
import {Session} from "./Session"

export class Store implements StoreInterface {

    private _name: string;
    private _collections: any[] = [];
    public cloudStoreUrl : string = "";
    private delimiter: string = '_';

    constructor(dbName: string){
        this._name = dbName;
    }

    // public authenticate(email, password){
    //     let user = {identity: email, password: password};
    //     this.socket
    //         .post('/auth/local', user, (jwt, res) => {
    //             switch(res.statusCode) {
    //                 case 200:
    //                     console.log("Authenticated successfully");
    //                     Session.setVal('user', res.data);
    //                     Session.isAuthenticated = true;
    //                     break;
    //                 default:
    //                 case 403:
    //                     console.error("Access denied");
    //                     break;
    //             }
    //         });
    // }

    write(collectionName: string, entireCollection: Object) {
        this.setItem(collectionName, entireCollection);
        return entireCollection;
    }

    /**
     * Create one in a collection
     * @param collection
     * @param key
     * @param object
     * @returns {Object}
     */
    create(collection: string, key: string, object: Object) {
        this.setItem(collection + this.delimiter + key, object);
        return object;
    }

    read(collection: string): any
    read(collection: string, key?: string): any {

        var result = this.getItem(collection);
        if(result == null) {
            console.log("no results");
            result = [];
        }
        return result;
    }

    update(collection: string, key: string, object: Object) {
        this.setItem(collection + this.delimiter + key, object);
        return object;
    }

    destroy(collection, key: string) {
        this.removeItem(collection + this.delimiter + key);
        return true;
    }

    setItem(key: string, data: any) {
        localStorage.setItem(this._name + this.delimiter + key, JSON.stringify(data));
    }

    getItem(key: string): any {
        return JSON.parse(localStorage.getItem(this._name + this.delimiter + key));
    }

    removeItem(key: string) {
        return localStorage.removeItem(key);
    }

    findOne(id: string) {
        return localStorage.getItem(id)
    }

    find(key: string) {
        return localStorage.getItem(key)
    }

    limit(by: number) {
    }

    populate(collectionsToPopulate: any[]) {
    }

    skip(skipTo: number, amount: number) {
    }

}