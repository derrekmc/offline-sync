import { StoreInterface } from "../interfaces/Store.Interface";

export class Store implements StoreInterface {

    private _name: string;
    private _collections: any[] = [];
    public cloudStoreUrl : string = "";
    private delimiter: string = '_';

    constructor(dbName: string){
        this._name = dbName;
    }

    write(collection: string, object: Object) {
        this.setItem(collection, object);
        return object;
    }

    create(collection: string, key: string, object: Object) {
        this.setItem(collection + this.delimiter + key, object);
        return object;
    }

    read(collection: string): any
    read(collection: string, key: string): any {

        var result = this.getItem(collection);
        if(result == null) {
            console.log("no results")
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