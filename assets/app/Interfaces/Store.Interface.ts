import {ModelInterface} from "./Model.Interface";

export interface StoreInterface {

    name: string;
    collections: ModelInterface[];
    remoteUrl: string;

    authenticate(username: string, password: string);

    addCollection(name: string);
    removeCollection(name: string);
    getCollections(): void;

    /**
     * collectionSync
     * entityIdentity
     * disconnect
     * connected
     * connecting
     *
     * create: entityIdentity
     * update: entityIdentity
     * destroy: entityIdentity
     *
     * @param entityIdentity
     */
    on(entityIdentity: string);
    connect(url: string): void;
    close(): void;

}