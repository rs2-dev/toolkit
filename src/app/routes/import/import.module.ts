import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import.component';
import { ImportLandingComponent } from './import-landing/import-landing.component';
import { PageModule } from '@shared/components/page/page.module';


@NgModule({
    declarations: [
        ImportComponent,
        ImportLandingComponent
    ],
    imports: [
        CommonModule,
        ImportRoutingModule,
        PageModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class ImportModule {
}
