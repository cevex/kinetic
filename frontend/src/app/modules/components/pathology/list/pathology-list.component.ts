import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Pathology } from '../../../core/domain/pathology/pathology.model';

@Component({
    selector: 'knt-pathology-list',
    templateUrl: './pathology-list.component.html',
    styleUrls: ['./pathology-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PathologyListComponent implements OnInit {

    @Input() pathologies: Pathology[];

    constructor() {
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
