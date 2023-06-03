import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpenRs2Component } from './open-rs2.component';
import { OpenRs2SearchComponent } from './open-rs2-search/open-rs2-search.component';
import { OpenRs2CacheComponent } from './open-rs2-cache/open-rs2-cache.component';

const routes: Routes = [
    {
        path: '',
        component: OpenRs2Component,
        children: [
            {
                path: ':cacheScope/:cacheId',
                component: OpenRs2CacheComponent
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
