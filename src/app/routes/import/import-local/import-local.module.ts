import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportLocalRoutingModule } from './import-local-routing.module';
import { ImportLocalComponent } from './import-local.component';
import { PageModule } from '@shared/components/page/page.module';


@NgModule({
    declarations: [
        ImportLocalComponent
    ],
    imports: [
        CommonModule,
        ImportLocalRoutingModule,
        PageModule
    ]
})
export class ImportLocalModule {
}
