import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'knt-welcome-guide',
    templateUrl: './welcome-guide.component.html',
    styleUrls: ['./welcome-guide.component.css']
})
export class WelcomeGuideComponent implements OnInit {

    public GUIDE_MESSAGES = [
        'KINETIC® vous permet d’identifier votre pathologie en 2 temps 3 mouvements',
        'KINETIC® vous guide ensuite dans  un parcours de soin adapté à votre pathologie en vous offrant des conseills, des recommandations et en vous guidant pas à pas dans la réalisation d’exercices sur mesure.',
        'En fonction de votre ressenti, KINETIC® va adapter les exercices jusqu’à votre rétablissement complet !',
    ];

    public quideMessage = this.GUIDE_MESSAGES[0];
    public guideIndex = 0;

    constructor() {
    }

    ngOnInit(): void {
    }

    initMessage(): void {
        this.quideMessage = this.GUIDE_MESSAGES[this.guideIndex];
    }

    nextPage(): void {
        this.guideIndex = this.guideIndex < this.GUIDE_MESSAGES.length - 1 ?
            this.guideIndex + 1 : 0;
        this.initMessage();
    }

    previousPage(): void {
        this.guideIndex = this.guideIndex > 0 ? this.guideIndex - 1 : this.GUIDE_MESSAGES.length - 1;
        this.initMessage();
    }

    goNext() {
        console.log('[welcome-guide] goNext');
    }
}
