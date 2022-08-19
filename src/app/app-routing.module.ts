import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { PathComponent } from './path/path.component';
import { PresentationComponent } from './presentation/presentation.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  { path: '', redirectTo: '/presentation', pathMatch: 'full' },
  {
    path: 'presentation',
    component: PresentationComponent,
    pathMatch: 'full',
    data: { animation: 'PresentationPage' },
  },
  {
    path: 'path',
    component: PathComponent,
    pathMatch: 'full',
    data: { animation: 'PathPage' },
  },
  {
    path: 'skills',
    component: SkillsComponent,
    pathMatch: 'full',
    data: { animation: 'SkillsPage' },
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    pathMatch: 'full',
    data: { animation: 'ProjectsPage' },
  },
  {
    path: 'contact',
    component: ContactComponent,
    pathMatch: 'full',
    data: { animation: 'ContactPage' },
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
