import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CacheComponent } from '@routes/caches/cache/cache.component';
import { CacheDetailsComponent } from '@routes/caches/cache/cache-details/cache-details.component';
import { IndexDetailsComponent } from '@routes/caches/cache/index-details/index-details.component';

const routes: Routes = [
    {
        path: '',
        component: CacheComponent,
        children: [
            {
                path: 'indexes/:indexNumber',
                component: IndexDetailsComponent
            },
            {
                path: '',
                component: CacheDetailsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CacheRoutingModule {
}
