import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/auth-guard.service';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import {ConfigurationComponent} from './configuration/configuration.component'

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path:'',
        component: FullLayoutComponent,
        data:{
            title:'Dashboard'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './app/dashboard/dashboard.module#DashboardModule',
                canActivate:[AuthGuard]
            },
            {
                path:'configuration',
                loadChildren:'./app/configuration/configuration.module#ConfigurationModule',
                canActivate:[AuthGuard]
            }
        ]
    },
    {
        path: 'pages',
        component: SimpleLayoutComponent,
        data:{
            title: 'Pages'
        },
        children: [
            {
                path: '',
                loadChildren:'./app/pages/pages.module#PagesModule',
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}