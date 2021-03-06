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
            title:'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                canActivate:[AuthGuard]
            },
            {
                path:'configuration',
                loadChildren:'./configuration/configuration.module#ConfigurationModule',
                canActivate:[AuthGuard]
            },
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
                loadChildren:'./pages/pages.module#PagesModule',
            }
        ]
    },
    {
        path:'login',
        redirectTo:'pages/login'
    },
    {
        path:'register',
        redirectTo:'pages/register'
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
