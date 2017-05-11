enum StorageType {
    memory,
    localStorage
}

export class Session {

    public static _session;
    public static _name: string = "session";
    public static _storageType: StorageType = StorageType.localStorage;

    public static isAuthenticated: boolean = false;
    public static started: boolean = false;

    constructor(){

    }

    public static startSession() {
        Session._session = {};
        Session.started = true;
        Session.setVar(Session._name, {});
    }

    public static stopSession(){
        delete(Session._session);
        Session.deleteVar(Session._name);
    }

    // public static authenticate(email, password){
    //     let user = {identity: email, password: password};
    //     this.socket
    //         .post('/auth/local', user, (res) => {
    //             if(res.response == 200){
    //                 console.log("Authenticated successfully");
    //                 Session.setVal('user', user);
    //                 Session.isAuthenticated = true;
    //             }else{
    //                 console.log("Could not authenticate");
    //             }
    //
    //         });
    // }

    public static getVar(name: string): any{
        console.log("getVar", name);
        switch(Session._storageType){

            case StorageType.localStorage:
                return JSON.parse(localStorage.getItem(name));

            case StorageType.memory:
                return Session._session[name];
        }
    }

    public static setVar(name: string = "", value: any = ""): void{
        console.log("setVar: ", name, "=",value);
        localStorage.setItem(name, JSON.stringify(value));
    }

    public static deleteVar(name: string): void{
        localStorage.removeItem(name);
        if(Session._session[name]) delete(Session._session[name]);
    }

}
