import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserProfile } from '../../../core/domain/user/user.model';
import { BodyArea } from "~/app/modules/core/domain/body/body-area-data.model";

export declare type IconCircleSize = 'small' | 'medium' | 'big';

@Component({
    selector: 'knt-icon-circle',
    templateUrl: './icon-circle.component.html',
    styleUrls: ['./icon-circle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconCircleComponent implements OnInit {

    @Input() userProfile: UserProfile;
    @Input() size: IconCircleSize;

    @Output() selected = new EventEmitter<BodyArea>();

    private static index: number = 0;

    constructor() {
    }

    ngOnInit(): void {
    }

    public getAvatar(): string {
        this.iterate();
        return '~/assets/img/avatar/avatar-' + (IconCircleComponent.index) + '.jpeg';
    }

    private iterate() {
        IconCircleComponent.index++;
        if (IconCircleComponent.index === 5) IconCircleComponent.index = 0;
    }

}
