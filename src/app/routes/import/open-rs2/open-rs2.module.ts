import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenRs2RoutingModule } from './open-rs2-routing.module';
import { OpenRs2Component } from './open-rs2.component';
import { OpenRs2SearchComponent } from './open-rs2-search/open-rs2-search.component';
import { OpenRs2FileStoreComponent } from './open-rs2-file-store/open-rs2-file-store.component';
import { NavModule } from '../../../shared/components/nav/nav.module';
import { OpenRs2Service } from '../../../shared/services/open-rs2/open-rs2.service';
import { PageModule } from '../../../shared/components/page/page.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { OpenRs2LabelPipe } from '../../../shared/pipes/open-rs2-label.pipe';


@NgModule({
    declarations: [
        OpenRs2Component,
        OpenRs2SearchComponent,
        OpenRs2FileStoreComponent
    ],
    imports: [
        CommonModule,
        OpenRs2RoutingModule,
        NavModule,
        PageModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        OpenRs2LabelPipe
    ],
    providers: [
        OpenRs2Service
    ]
})
export class OpenRs2Module {
}
