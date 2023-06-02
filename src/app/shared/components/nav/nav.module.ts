import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NavComponent } from './nav.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';


@NgModule({
    declarations: [
        NavComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        RouterLink
    ],
    exports: [
        NavComponent
    ]
})
export class NavModule {
}
