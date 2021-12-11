import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'knt-pathology-dashboard',
    templateUrl: './pathology-dashboard.component.html',
    styleUrls: ['./pathology-dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PathologyDashboardComponent implements OnInit {

    // =======================================================================
    //                          Attributes
    // =======================================================================


    // =======================================================================
    //                          Constructor
    // =======================================================================

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
