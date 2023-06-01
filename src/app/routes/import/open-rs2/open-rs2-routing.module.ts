import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpenRs2Component } from './open-rs2.component';
import { OpenRs2SearchComponent } from './open-rs2-search/open-rs2-search.component';
import { OpenRs2FileStoreComponent } from './open-rs2-file-store/open-rs2-file-store.component';

const routes: Routes = [
    {
        path: '',
        component: OpenRs2Component,
        children: [
            {
                path: ':fileStoreScope/:fileStoreId',
                component: OpenRs2FileStoreComponent
            },
            {
                path: '',
                component: OpenRs2SearchComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OpenRs2RoutingModule {
}
