import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';

import { DashboardModule } from './dashboard/dashboard.module';

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
                loadChildren: DashboardModule
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}