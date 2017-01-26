import {StoreInterface} from "../interfaces/Store.Interface";
import {MessageInterface} from "../interfaces/Message.Interface";
import {SchemaInterface} from "../interfaces/Schema.Interface";
export interface ModelInterface {
    /**
     * "name" Model name
     */
    __name: string;
    /**
     * "attributes" The model properties definition/schema
     */
    attributes: any;

    /**
     * The data store
     */
    dataStore: StoreInterface;
    /**
     * The message store
     */
    messageStore: MessageInterface;

    create(object: Object): any;
    afterCreate(object: Object);

    read();

    update(object: Object);
    afterUpdate(object: Object);

    destroy(id: string);
    afterDestroy(object: Object);

    findOne(id: string);
    find(by: Object);
    limit(by: number);
    populate(collectionsToPopulate: any[]);
    skip(skipTo: number, amount: number);

}