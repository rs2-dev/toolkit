import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { NavModule } from '../nav/nav.module';


@NgModule({
    declarations: [
        PageComponent
    ],
    imports: [
        CommonModule,
        NavModule
    ],
    exports: [
        PageComponent
    ]
})
export class PageModule {
}
