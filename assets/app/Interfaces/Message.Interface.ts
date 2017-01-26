export interface MessageInterface {
    _name: string;
    post(uri: string, object: any);
    get(uri: string);
    put(uri: string, object: any);
    delete(uri: string);

    /**
     * Not Yet Implemented
     */
    // on(channel: string): any;
    // subscribe(channel: string): any;
    // publish(channel: string, data: any): any;
    // send(channel: string, data: any): any;
    // emit(channel: string, data: any): any;
}