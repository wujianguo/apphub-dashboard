import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationComponent } from './components/application/application.component';
import { DownloadComponent } from './components/download/download.component';
import { DownloadDetailComponent } from './components/download-detail/download-detail.component';
import { OverviewComponent } from './components/overview/overview.component';
import { PackagesComponent } from './components/packages/packages.component';
import { PackageDetailComponent } from './components/package-detail/package-detail.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { UpgradesComponent } from './components/upgrades/upgrades.component';
import { StoresComponent } from './components/stores/stores.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { NewApplicationComponent } from './components/new-application/new-application.component';
import { VisibleAppsComponent } from './components/visible-apps/visible-apps.component';
import { NamespaceTypeGuardGuard } from './services/namespace-type-guard.guard';

const routes: Routes = [
  {
    path: 'apps/new',
    component: NewApplicationComponent,
  },
  {
    path: ':namespace_type/:namespace/apps/:path',
    component: ApplicationComponent,
    canActivate: [NamespaceTypeGuardGuard],
    children: [
      {
        path: '',
        component: OverviewComponent,
      }, {
        path: 'packages',
        component: PackagesComponent,
      }, {
        path: 'packages/:id',
        component: PackageDetailComponent,
      }, {
        path: 'releases',
        component: ReleasesComponent,
      }, {
        path: 'upgrades',
        component: UpgradesComponent,
      }, {
        path: 'stores',
        component: StoresComponent,
      }, {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
  {
    path: 'd/:slug',
    component: DownloadComponent,
    children: [
      {
        path: '',
        component: DownloadDetailComponent
      }, {
        path: ':package_id',
        component: DownloadDetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }

export const routedComponents = [
  ApplicationComponent,
  DownloadComponent,
  DownloadDetailComponent,
  OverviewComponent,
  PackagesComponent,
  PackageDetailComponent,
  ReleasesComponent,
  UpgradesComponent,
  StoresComponent,
  SettingsComponent,
  ApplicationsComponent,
  NewApplicationComponent,
  VisibleAppsComponent,
]