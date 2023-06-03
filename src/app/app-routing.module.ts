import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'caches',
        loadChildren: () => import('./routes/caches/caches.module').then(m => m.CachesModule)
    },
    {
        path: 'import',
        loadChildren: () => import('./routes/import/import.module').then(m => m.ImportModule)
    },
    {
        path: '',
        loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
