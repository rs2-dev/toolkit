import { Component, Input } from '@angular/core';

export interface Breadcrumb {
    link?: string | any[];
    text: string;
}

@Component({
    selector: 'rs-folder',
    templateUrl: './folder.component.html',
    styleUrls: ['./folder.component.scss']
})
export class FolderComponent {

    @Input()
    breadcrumb: Breadcrumb[] | null = null;

}
