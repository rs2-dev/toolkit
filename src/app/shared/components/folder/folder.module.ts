import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderComponent } from './folder.component';
import { FileComponent } from './file/file.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';


@NgModule({
    declarations: [
        FolderComponent,
        FileComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        RouterLink
    ],
    exports: [
        FolderComponent,
        FileComponent
    ]
})
export class FolderModule {
}
