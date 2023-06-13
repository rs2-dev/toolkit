import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CachesComponent } from './caches.component';
import { CacheListComponent } from '@routes/caches/cache-list/cache-list.component';

const routes: Routes = [
    {
        path: '',
        component: CachesComponent,
        children: [
            {
                path: ':cacheId',
                loadChildren: () => import('./cache/cache.module').then(m => m.CacheModule)
            },
            {
                path: '',
                component: CacheListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CachesRoutingModule {
}
