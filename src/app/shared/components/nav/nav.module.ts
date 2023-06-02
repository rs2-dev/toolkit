import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
    declarations: [
        NavComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatDividerModule
    ],
    exports: [
        NavComponent
    ]
})
export class NavModule {
}
