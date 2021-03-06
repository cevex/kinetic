import { Injectable } from '@angular/core';
import { Screen, View } from '@nativescript/core';
import { fromEvent, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Dimension {
    width: number;
    height: number;
}

@Injectable({
    providedIn: 'root'
})
export class NativescriptViewService {

    constructor() {
    }

    /**
     * Read dimension of the given NsView
     *
     * Careful : With tns we can get dimension by reading "actualSize" only after navigation/orientation events :-(
     * @see https://stackoverflow.com/questions/35464292/how-to-find-watch-the-dimensions-of-a-view-in-a-nativescript-layout/35671337
     */
    public getViewDimension(view: View): Observable<Dimension> {
        return fromEvent(view, 'layoutChanged').pipe(
            map(_ => ({
                width: view.getActualSize().width,
                height: view.getActualSize().height
            })),
            take(1)
        );
    }
}
