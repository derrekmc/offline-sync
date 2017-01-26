import { StoreInterface } from "../interfaces/Store.Interface";

export class Store implements StoreInterface {

    private _nameSpace: string;
    private _collections: any;
    public cloudStoreUrl : string;

    public adapter: StoreInterface;

    constructor(namespace: string, storeAdapter: StoreInterface){
        this.adapter = storeAdapter;
    }

    create(key: string, object: Object) {
        return this.adapter.create(key, object);
    }

    read(key: string): any {
        return this.adapter.read(key);
    }

    update(key: string, object: Object) {
        return this.adapter.update(key, object);
    }

    destroy(key: string) {
        return this.adapter.destroy(key);
    }

    post(uri: string, object: any) {
        return this.adapter.create(uri, object);
    }

    get(uri: string) {
        return this.adapter.read(uri);
    }

    put(uri: string, object: any) {
        return this.adapter.update(uri, object);
    }

    delete(uri: string) {
        return this.adapter.destroy(uri);
    }

    setItem(key: string, object: any) {
        return localStorage.setItem(key, object);
    }

    getItem(key: string): any {
        return localStorage.getItem(key);
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