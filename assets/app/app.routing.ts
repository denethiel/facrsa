import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/auth-guard.service';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';

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
                //canActivate:[AuthGuard]
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}