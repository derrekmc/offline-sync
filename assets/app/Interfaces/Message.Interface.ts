export interface MessageInterface {
    _name: string;
    on(channel: string): any;
    emit(channel: string, data: any): any;
}