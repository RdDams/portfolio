import { Component, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { ChildrenOutletContexts } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
  animateChild,
} from '@angular/animations';

const ratio = window.innerHeight / 600;
const backgroundXSize = Math.round(1648 * ratio);
const slideToRight = [
  group([
    animate(
      '800ms ease-out',
      style({ 'background-position': `-${backgroundXSize}px 0%` })
    ),
    query('@pageAnimation', animateChild()),
  ]),
];
const slideToLeft = [
  group([
    animate(
      '800ms ease-out',
      style({ 'background-position': `${backgroundXSize}px 0%` })
    ),
    query('@pageAnimation', animateChild()),
  ]),
];

const slidePageToRight = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    }),
  ]),
  query(':enter', [style({ transform: 'translateX(100%)' })]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate(
        '800ms ease-out',
        style({
          transform: 'translateX(-100%)',
        })
      ),
    ]),
    query(':enter', [
      animate('800ms ease-out', style({ transform: 'translateX(0%)' })),
    ]),
  ]),
];
const slidePageToLeft = [
  style({ position: 'relative' }),
  query(':enter , :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    }),
  ]),
  query(':enter', [style({ transform: 'translateX(-100%)' })]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('800ms ease-out', style({ transform: 'translateX(100%)' })),
    ]),
    query(':enter', [
      animate('800ms ease-out', style({ transform: 'translateX(0%)' })),
    ]),
  ]),
];

const backgroundAnimation = trigger('backgroundAnimation', [
  transition('PresentationPage => PathPage', slideToRight),
  transition('PresentationPage => SkillsPage', slideToRight),
  transition('PresentationPage => ProjectsPage', slideToRight),
  transition('PresentationPage => ContactPage', slideToRight),
  transition('PathPage => PresentationPage', slideToLeft),
  transition('SkillsPage => PresentationPage', slideToLeft),
  transition('ProjectsPage => PresentationPage', slideToLeft),
  transition('ContactPage => PresentationPage', slideToLeft),

  transition('PathPage => SkillsPage', slideToRight),
  transition('PathPage => ProjectsPage', slideToRight),
  transition('PathPage => ContactPage', slideToRight),
  transition('SkillsPage => PathPage', slideToLeft),
  transition('ProjectsPage => PathPage', slideToLeft),
  transition('ContactPage => PathPage', slideToLeft),

  transition('SkillsPage => ProjectsPage', slideToRight),
  transition('SkillsPage => ContactPage', slideToRight),
  transition('ProjectsPage => SkillsPage', slideToLeft),
  transition('ContactPage => SkillsPage', slideToLeft),

  transition('ProjectsPage => ContactPage', slideToRight),
  transition('ContactPage => ProjectsPage', slideToLeft),
]);
const pageAnimation = trigger('pageAnimation', [
  transition('PresentationPage => PathPage', slidePageToRight),
  transition('PresentationPage => SkillsPage', slidePageToRight),
  transition('PresentationPage => ProjectsPage', slidePageToRight),
  transition('PresentationPage => ContactPage', slidePageToRight),
  transition('PathPage => PresentationPage', slidePageToLeft),
  transition('SkillsPage => PresentationPage', slidePageToLeft),
  transition('ProjectsPage => PresentationPage', slidePageToLeft),
  transition('ContactPage => PresentationPage', slidePageToLeft),

  transition('PathPage => SkillsPage', slidePageToRight),
  transition('PathPage => ProjectsPage', slidePageToRight),
  transition('PathPage => ContactPage', slidePageToRight),
  transition('SkillsPage => PathPage', slidePageToLeft),
  transition('ProjectsPage => PathPage', slidePageToLeft),
  transition('ContactPage => PathPage', slidePageToLeft),

  transition('SkillsPage => ProjectsPage', slidePageToRight),
  transition('SkillsPage => ContactPage', slidePageToRight),
  transition('ProjectsPage => SkillsPage', slidePageToLeft),
  transition('ContactPage => SkillsPage', slidePageToLeft),

  transition('ProjectsPage => ContactPage', slidePageToRight),
  transition('ContactPage => ProjectsPage', slidePageToLeft),
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [backgroundAnimation, pageAnimation],
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private contexts: ChildrenOutletContexts,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    const domain = isPlatformServer(this.platformId)
      ? 'http://localhost:4200/'
      : '';
    this.matIconRegistry.addSvgIcon(
      `linkedin`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${domain}assets/icons/linkedin-in.svg`
      )
    );
    this.matIconRegistry.addSvgIcon(
      `github`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${domain}assets/icons/github-alt.svg`
      )
    );
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
