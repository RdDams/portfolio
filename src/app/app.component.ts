import {
  AfterViewChecked,
  Component,
  HostListener,
  Inject,
} from '@angular/core';
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
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from './services/windowRef.service';

const slideToRight = [
  group([
    animate(
      '800ms ease-out',
      style({ 'background-position': `-{{backgroundXSize}}px 0%` })
    ),
    query('@pageAnimation', animateChild()),
  ]),
];
const slideToLeft = [
  group([
    animate(
      '800ms ease-out',
      style({ 'background-position': `{{backgroundXSize}}px 0%` })
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
  transition('PresentationPage => PathPage', slideToRight, {
    params: { backgroundXSize: 0 },
  }),
  transition('PresentationPage => SkillsPage', slideToRight, {
    params: { backgroundXSize: 0 },
  }),
  transition('PresentationPage => ProjectsPage', slideToRight, {
    params: { backgroundXSize: 0 },
  }),
  transition('PresentationPage => ContactPage', slideToRight, {
    params: { backgroundXSize: 0 },
  }),
  transition('PathPage => PresentationPage', slideToLeft, {
    params: { backgroundXSize: 0 },
  }),
  transition('SkillsPage => PresentationPage', slideToLeft, {
    params: { backgroundXSize: 0 },
  }),
  transition('ProjectsPage => PresentationPage', slideToLeft, {
    params: { backgroundXSize: 0 },
  }),
  transition('ContactPage => PresentationPage', slideToLeft, {
    params: { backgroundXSize: 0 },
  }),

  transition('PathPage => SkillsPage', slideToRight, {
    params: { backgroundXSize: 0 },
  }),
  transition('PathPage => ProjectsPage', slideToRight, {
    params: { backgroundXSize: 0 },
  }),
  transition('PathPage => ContactPage', slideToRight, {
    params: { backgroundXSize: 0 },
  }),
  transition('SkillsPage => PathPage', slideToLeft, {
    params: { backgroundXSize: 0 },
  }),
  transition('ProjectsPage => PathPage', slideToLeft, {
    params: { backgroundXSize: 0 },
  }),
  transition('ContactPage => PathPage', slideToLeft, {
    params: { backgroundXSize: 0 },
  }),

  transition('SkillsPage => ProjectsPage', slideToRight, {
    params: { backgroundXSize: 0 },
  }),
  transition('SkillsPage => ContactPage', slideToRight, {
    params: { backgroundXSize: 0 },
  }),
  transition('ProjectsPage => SkillsPage', slideToLeft, {
    params: { backgroundXSize: 0 },
  }),
  transition('ContactPage => SkillsPage', slideToLeft, {
    params: { backgroundXSize: 0 },
  }),

  transition('ProjectsPage => ContactPage', slideToRight, {
    params: { backgroundXSize: 0 },
  }),
  transition('ContactPage => ProjectsPage', slideToLeft, {
    params: { backgroundXSize: 0 },
  }),
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
  private backgroundXSize: number | undefined;

  @HostListener('window:resize')
  getScreenSize() {
    const ratio = this.windowRef.nativeWindow.innerHeight / 600;
    this.backgroundXSize = Math.round(1648 * ratio);
  }

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private contexts: ChildrenOutletContexts,
    @Inject(PLATFORM_ID) private platformId: string,
    private windowRef: WindowRef
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.getScreenSize();
    }
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
    return {
      value:
        this.contexts.getContext('primary')?.route?.snapshot?.data?.[
          'animation'
        ],
      params: {
        backgroundXSize: this.backgroundXSize,
      },
    };
  }
}
