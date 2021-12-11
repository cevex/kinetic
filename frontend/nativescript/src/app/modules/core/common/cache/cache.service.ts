import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class CacheService<T> {

    protected data: T;
    protected fetching: boolean;
    protected dataSub$ = new Subject<T>();

    // =======================================================================
    //                  Public API
    // =======================================================================

    /**
     * Retrieve the data from cache.
     */
    public get(...params: any[]): Observable<T> {
        if (this.data) return of(this.data);
        if (this.fetching) return this.dataSub$.asObservable();
        return this.load();
    }

    /**
     * Retrieve the cache as flat data.
     * CAREFUL : It may not have been load yet.
     */
    public getFlat(): T {
        return this.data;
    }

    public flush() {
        this.data = null;
        this.dataSub$ = new Subject<T>();
        this.fetching = false;
    }

    // =======================================================================
    //                  Contributor API
    // =======================================================================

    protected abstract getData(...params: any[]): Observable<T>;

    // =======================================================================
    //                  Cache Engine
    // =======================================================================

    protected load(...params: any[]): Observable<T> {
        // Reset state
        this.flush();
        this.fetching = true;

        this.getData(params).subscribe((data: T) => {
            // Set state
            this.data = data;
            this.fetching = false;

            // Notify
            this.dataSub$.next(data);
            this.dataSub$.complete();
        });
        return this.dataSub$;
    }

}
