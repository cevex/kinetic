import { Injectable } from '@angular/core';
import { CouchBase } from '@triniwiz/nativescript-couchbase';
import { ConcurrencyMode, Query } from '@triniwiz/nativescript-couchbase/common';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private database: CouchBase;

    constructor() {
    }

    public init() {
        this.database = new CouchBase('kinetic-profiles');
    }

    public getDocument(documentId: string): any {
        return this.database.getDocument(documentId);
    }

    public updateDocument(documentId: string, data: any) {
        return this.database.updateDocument(documentId, data);
    }

    public query(query?: Query): any[] {
        return this.database.query(query);
    }

    public createDocument(data: any) {
        return this.database.createDocument(data);
    }

    public deleteDocument(documentId: string): boolean {
        return this.database.deleteDocument(documentId);
    }

}
