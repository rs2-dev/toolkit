import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CacheComponent } from '@routes/caches/cache/cache.component';
import { CacheDetailsComponent } from '@routes/caches/cache/cache-details/cache-details.component';

const routes: Routes = [
    {
        path: '',
        component: CacheComponent,
        children: [
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
