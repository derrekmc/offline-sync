import { LocalStorageAdapter } from "../adapters/LocalStorage.Adapter";
import { SailsAdapter } from "../adapters/Sails.Adapter";
import { Store } from "../services/Store";

export let store = new Store("surecheckdb", new LocalStorageAdapter("surecheckdb", "https://surecheckapi.herokuapp.com"));
