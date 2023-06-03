import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CachesComponent } from './caches.component';

const routes: Routes = [
    {
        path: '',
        component: CachesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CachesRoutingModule {
}
