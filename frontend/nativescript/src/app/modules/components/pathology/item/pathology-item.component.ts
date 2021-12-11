import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Pathology } from '../../../core/domain/pathology/pathology.model';

@Component({
    selector: 'knt-pathology-item',
    templateUrl: './pathology-item.component.html',
    styleUrls: ['./pathology-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PathologyItemComponent implements OnInit {

    @Input() pathology: Pathology;

    constructor(

    ) {
    }

    ngOnInit(): void {
        this.initData();
    }

    // =======================================================================
    //                          Actions
    // =======================================================================

    private initData() {
    }

    public goNext() {
    }
}
