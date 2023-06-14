import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportComponent } from './import.component';
import { ImportLandingComponent } from '@routes/import/import-landing/import-landing.component';

const routes: Routes = [
    {
        path: '',
        component: ImportComponent,
        children: [
            {
                path: 'openrs2',
                loadChildren: () => import('./open-rs2/open-rs2.module').then(m => m.OpenRs2Module)
            },
            {
                path: 'local',
                loadChildren: () => import('./import-local/import-local.module').then(m => m.ImportLocalModule)
            },
            {
                path: '',
                component: ImportLandingComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImportRoutingModule {
}
