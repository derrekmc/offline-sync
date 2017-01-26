export interface SchemaInterface {
    /**
     * "name" Model name
     */
    _name: string;
    /**
     * "attributes" The model properties definition/schema
     */
    attributes: Object;
    /**
     * The schema you want to sync with the remote
     */
    syncAttributes: Object;
    /**
     * @param syncAllData boolean
     * Sync all fields specified in this data model or only the received data.
     */
    remoteAttributesUrl: string;
    /**
     * "attemptRemoteAttributes" boolean
     * Attempt to pull the models attributes from the remote store.
     * store must have a "remoteAttributesUrl"
     * @see Store
     */
}