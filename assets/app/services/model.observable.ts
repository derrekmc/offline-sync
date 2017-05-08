import {SailsService} from "angular2-sails/dist/index";
import {StoreInterface} from "../Interfaces/Store.Interface";
import {ModelInterface} from "../Interfaces/Model.Interface";
import * as _ from "lodash";

export class Model implements ModelInterface{

    ___name: string = 'No Name Specified';
    attributes: any = {};
    public collection: any[] = [];
    dataStore: StoreInterface;
    socket: any;
    queryBuilder;

    constructor(name: string, public sailsService: SailsService) {
        this.___name = name;
        this.socket = sailsService;
        this.collection = [];

        this.initQuery();

        if(!this.socket._connected) {
            console.log("Connected");
            this.socket.connect("https://surecheckapi.herokuapp.com", {
                transports: ['websocket', 'polling']
            });
            this.socket.on("error")
              .subscribe(error => console.error("Web socket error:", error) );
        }
    }

    /**
     * Create a model object
     * @param object the model object data
     */
    create(object: Object): this {
        console.log("create:", this.___name);
        this.initQuery();
        this.queryBuilder.create = 'post';
        this.queryBuilder.rest = 'post';
        this.queryBuilder.data = object;
        return this;
    }

    /**
     * Read all items in the collection
     */
    read(): this {
        console.log("read:", this.___name);
        this.initQuery();
        this.queryBuilder.action = 'read';
        this.queryBuilder.rest = 'get';
        return this;
    }

    /**
     * Update a model in the database
     * @param id The id of the data object
     * @param object The data object itself
     */
    update(id: string, object: Object): this {
        console.log("update:", this.___name);
        this.initQuery();
        this.queryBuilder.action = 'update';
        this.queryBuilder.rest = 'put';
        this.queryBuilder.id = id;
        this.queryBuilder.data = object;
        return this;
    }

    /**
     * Destroy an item in the datastore
     * @param id the id of the object you want to destroy
     */
    destroy(id: string): this {
        console.log("destroy:", this.___name);
        this.initQuery();
        this.queryBuilder.action = 'destroy';
        this.queryBuilder.rest = 'put';
        this.queryBuilder.id = id;
        this.queryBuilder.data = {id: id, active: false};
        return this;

    }

    /**
     * Find items only that equal the query below.  Not case sensitive.
     * @param by Object with find parameters {"name":"value"}, {"name":{"contains":"value"}}
     */
    find(by: Object): this {
        console.log("find:", this.___name);
        this.initQuery();
        this.queryBuilder.action = 'find';
        this.queryBuilder.rest = 'get';
        this.queryBuilder.type = 'filter'; // or function to execute
        this.queryBuilder.query.push('where=' + JSON.stringify(by));
        return this;
    }

    /**
     * Find items that contain the key and value below. Not case sensitive.
     * @param key key name
     * @param value the search value
     */
    contains(key: string, value: string): this {
        console.log("contains:", this.___name);
        this.initQuery();
        this.queryBuilder.action = 'contains';
        this.queryBuilder.rest = 'get';
        this.queryBuilder.query.push('where={"' + key + '":{"contains":"' + value + '"}}');
        return this;
    }

    /**
     * Find items only that equal the query below.  Not case sensitive.
     * @param key Object with find parameters {"name":"value"}, {"name":{"contains":"value"}}
     * @param value Object with find parameters {"name":"value"}, {"name":{"contains":"value"}}
     */
    findOne(key: string, value: string): this {
        console.log("findOne:", this.___name);
        return this
          .find({key: value})
          .limit(1);
    }

    /**
     * Find items only that equal the query below.  Not case sensitive.
     * @param id Object with find parameters {"name":"value"}, {"name":{"contains":"value"}}
     */
    findOneById(id: string): this {
        console.log("findOneById:", this.___name);
        return this
          .find({'id': id})
          .limit(1);
    }

    /**
     * Find items only that equal the query below.  Not case sensitive.
     * @param by Object with find parameters {"name":"value"}, {"name":{"contains":"value"}}
     */

    sort(by: string): this{
        console.log("sort:", this.___name);
        this.queryBuilder.query.push('sort=' + by);
        return this;
    }

    populate(...collectionsToPopulate): this {
        console.log("populate:", this.___name);
        var populate = collectionsToPopulate.join(',');
        this.queryBuilder.query.push('populate=' + populate);
        return this;
    }

    limit(by: number): this {
        console.log("create:", this.___name);
        this.queryBuilder.query.push('limit=' + by);
        return this;
    }

    skip(to: number): this {
        console.log("create:", this.___name);
        this.queryBuilder.query.push('skip=' + to);
        return this;
    }

    paginate(page, limitPerPage): this {
        console.log("paginate:", this.___name);
        var skip = page * limitPerPage;
        return this
          .skip(skip)
          .limit(limitPerPage);
    }

    exec() {
        //this.queryBuilder.query.push('version=0.0.1');

        var query = '/' + this.___name + (!this.queryBuilder.id ? '?' + this.queryBuilder.query.join('&') : '/' + this.queryBuilder.id);
        console.log("exec:", query, this.queryBuilder.data);
            return this.socket[this.queryBuilder.rest](query, this.queryBuilder.data)
              .map(
                (resData) => {
                    switch(resData.statusCode){
                        case "404":
                            return "Reference Id not found in the database";
                            break;
                        default:
                            return resData.data;
                            break;
                    }

                },
                (error) => {
                    console.error("error occured", error); return error;
                },
                () => { console.log("finished retrieval") }
              )
    }

    on() {
        console.log("on:", this.___name);
        return this.socket
          .on(this.___name)
    }

    subscribe(callback) {
        console.log("subscribing to collection:", this.___name);
        return this.socket
          .on(this.___name)
          .subscribe(
            model => {
                switch(model.verb){
                    case "created":
                        this.collection.push(model.data);
                        break;
                    case "updated":
                        this.collection = this.compareAndUpdateCollection(this.collection, [model.data]);
                        break;
                    case "destroyed":
                        _.remove(this.collection, function(object){ return object.id == model.id; });
                        break;
                }
                console.log("this.collection", this.collection)
                if(callback) callback(this.collection);
            });
    }

    compareAndUpdateCollection(currentCollection, collectionAdditions){
        return _.each(collectionAdditions, (model)=>{
            var object = _.find(currentCollection, (o) => { return o.id == model.id; });
            if(object){
                _.extend(object, model.data);
            }else{
                currentCollection.push(model);
            }
        });
    }

    initQuery(){
        this.queryBuilder = {
            action: null,
            id: null,
            data: null,
            query: []
        };
    }


}