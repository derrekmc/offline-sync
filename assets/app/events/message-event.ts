export class RemoteEvent extends MessageEvent{
    data: any;
    constructor(data:any){
        super("RemoteEvent", data);
        this.data = data;
    }
}