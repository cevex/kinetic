import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
    providedIn: 'root'
})
export abstract class ArrayCacheService<T> extends CacheService<T[]> {

    protected constructor() {
        super();
    }

    // =======================================================================
    //                  Public API
    // =======================================================================

    public get(...params: any[]): Observable<T[]> {
        return super.get(...params);
    }

    // =======================================================================
    //                  Contributor API
    // =======================================================================

    protected abstract getData(...params: any[]): Observable<T[]>;

    // =======================================================================
    //                  Cache Engine
    // =======================================================================

    protected load(...params: any[]): Observable<T[]> {
        return super.load(params);
    }

}
