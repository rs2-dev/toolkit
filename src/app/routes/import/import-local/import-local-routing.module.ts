import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportLocalComponent } from '@routes/import/import-local/import-local.component';

const routes: Routes = [
    {
        path: '',
        component: ImportLocalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImportLocalRoutingModule {
}
