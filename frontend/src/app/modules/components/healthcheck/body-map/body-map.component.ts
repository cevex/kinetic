import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { View } from '@nativescript/core';
import { Dimension, NativescriptViewService } from '../../../core/common/nativescript-view.service';
import { BodyArea } from '../../../core/domain/body/body-area-data.model';
import { BodyMapService } from './body-map.service';
import { BodyPosition } from './body-position.model';

@Component({
    selector: 'knt-body-map',
    templateUrl: './body-map.component.html',
    styleUrls: ['./body-map.component.css'],
})
export class BodyMapComponent implements OnInit, AfterViewInit {

    // =======================================================================
    //                          Attributes
    // =======================================================================

    @Input() bodyAreas: BodyArea[];
    @Input() screenHeightPortion: number = 0.7;
    @Output() choice = new EventEmitter<BodyArea>();

    // ===================   Elements  ========================================

    @ViewChild('layoutElement') layoutElement: ElementRef;

    // ===================   Internals  ========================================

    public viewDimension: Dimension;
    public bodyPositions: BodyPosition[] = [];

    // =======================================================================
    //                          Constructor
    // =======================================================================

    constructor(
        private bodyMapService: BodyMapService,
        private cdr: ChangeDetectorRef,
        private viewService: NativescriptViewService
    ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.initData();
    }

    // =======================================================================
    //                          Data
    // =======================================================================

    public initData() {
        const view = <View>this.layoutElement.nativeElement;
        this.viewService.getViewDimension(view).subscribe(viewDimension => {
            this.viewDimension = viewDimension;
            this.mapElements();
            this.cdr.detectChanges();
        });
    }

    public mapElements() {
        this.bodyPositions = this.bodyMapService.mapAreas(this.bodyAreas, this.viewDimension);
    }

    public selectArea(bodyPosition: BodyPosition) {
        const bodyArea = this.bodyAreas.find(bodyArea => bodyArea.type === bodyPosition.id);
        this.choice.emit(bodyArea);
    }
}
