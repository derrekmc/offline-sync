import {MessageInterface} from "../Interfaces/Message.Interface";
//import * as io from 'socket.io-client/dist/socket.io.js'
import {SailsService} from "angular2-sails/dist/index";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";

@Injectable()
export class SailsMessageService implements SailsService, MessageInterface {

    private __name: string;
    private socket: any;
    public data$: Observable<any[]>;

    constructor(private sailsService: SailsService) {
        this.socket = sailsService;
        console.log("this.socket", this.socket);
        this.socket.connect("https://surecheckapi.herokuapp.com");
    }

    post(url: any, data?: any) {
        return this.socket.post(url, data);
    }

    read(url: any, data?: any): Observable<any[]> {
        return this.socket.get(url).map((resData) => { this.data$ = resData.data; return this.data$;},
            (error) => { console.log("error occured", error) }
            () => { console.log("finished retrieval") }
    )

    }

    put(url: any, data?: any): any {
        return this.socket.put(url, data)
    }

    delete(url: any, data?: any): any {
        return this.socket.delete(url, data)
    }

    connect(url: any, opts?: any): void {
    }

    request(options: any): Observable<any> {
        return null;
    }

    on(eventIdentity: string): Observable<any> {
        return null;
    }

    subscribe() {
        this.socket.on(this.__name, function(data){
            console.log(data);
        });
        return;
    }
}