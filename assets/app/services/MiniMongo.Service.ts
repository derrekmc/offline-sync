import * as minimongo from 'minimongo';
import {Injectable, OnInit } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {StoreInterface} from "../lib/Store.Interface";

@Injectable({})
export class MiniMongoService implements StoreInterface, OnInit{

    _name: string;
    public minimongo: minimongo;

    constructor(name: string, minimongo: any) {
        this._name = name;
        this.minimongo = minimongo;
        //var LocalDb = this.minimongo.MemoryDb;
    }

    ngOnInit(): void {
    }

    create(object: Object) {
    }

    read(options: string): any {
        return null;
    }

    update(object: Object) {
    }

    destroy() {
    }

    post(uri: string, object: any) {
    }

    get(uri: string) {
    }

    put(uri: string, object: any) {
    }

    delete(uri: string) {
    }

    setItem(key: string, object: any) {
    }

    getItem(key: string): any {
        return null;
    }

    removeItem(key: string) {
    }

    findOne(id: string) {
    }

    find(searchBy: string) {
    }

    limit(by: number) {
    }

    populate(collectionsToPopulate: any[]) {
    }

    skip(skipTo: number, amount: number) {
    }



}