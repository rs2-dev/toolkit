import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CachesRoutingModule } from './caches-routing.module';
import { CachesComponent } from './caches.component';


@NgModule({
    declarations: [
        CachesComponent
    ],
    imports: [
        CommonModule,
        CachesRoutingModule
    ]
})
export class CachesModule {
}
