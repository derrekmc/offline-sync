import { StoreInterface } from "../interfaces/Store.Interface";
import { NgZone } from "@angular/core";
import { SailsService } from 'angular2-sails'


export class SailsAdapter extends SailsService implements StoreInterface{

    sailsService :SailsService;
    serverUrl: string;

    constructor(zone: NgZone, sailsServerUrl: string){
        super(zone);
        this.sailsService = SailsService;
        this.serverUrl = sailsServerUrl;
        this.sailsService.connect(this.serverUrl);
    }

    create(key: string, object: Object) {
        return this.sailsService.post(this.serverUrl + '/' + key, object);
    }

    read(key: string): any {
        return this.sailsService.get(this.serverUrl + '/' + key);
    }

    update(key: string, object: Object) {
        return this.sailsService.put(this.serverUrl + '/' + key, object);
    }

    destroy(key: string) {
        return "Not yet Implemented";
    }

    findOne(id: string) {
        return "Not yet Implemented";
    }

    find(by: string) {
        return "Not yet Implemented";
    }

    limit(by: number) {
        return "Not yet Implemented";
    }

    populate(collectionsToPopulate: any[]) {
        return "Not yet Implemented";
    }

    skip(skipTo: number, amount: number) {
        return "Not yet Implemented";
    }

}