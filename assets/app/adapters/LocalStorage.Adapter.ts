import { StoreInterface } from "../interfaces/Store.Interface";

export class LocalStorageAdapter implements StoreInterface {

	constructor(namespace: string, storeAdapter: StoreInterface){
		//super(storeAdapter);
	}

	create(key: string, object: Object) {
		return this.setItem(key, object);
	}

	read(key: string): any {
		return this.getItem(key);
	}

	update(key: string, object: Object) {
		return this.setItem(key, object);
	}

	destroy(key: string) {
		return this.removeItem(key);
	}

	setItem(key: string, object: any) {
		return localStorage.setItem(key, object);
	}

	getItem(key: string): any {
		return localStorage.getItem(key);
	}

	removeItem(key: string) {
		return localStorage.removeItem(key);
	}

	findOne(id: string) {
		return localStorage.getItem(id)
	}

	find(key: string) {
		return localStorage.getItem(key)
	}

	limit(by: number) {
	}

	populate(collectionsToPopulate: any[]) {
	}

	skip(skipTo: number, amount: number) {
	}
}