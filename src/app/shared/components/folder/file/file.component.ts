import { Component, Input } from '@angular/core';

@Component({
    selector: 'rs-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss']
})
export class FileComponent {

    @Input()
    icon: string | null = null;

    @Input()
    type: 'folder' | 'file' = 'file';

    @Input()
    name: string = '';

    get fileIcon(): string {
        // Pick the default icon based off of the file type (folder or flat file)
        return this.icon || (this.type === 'folder' ? 'folder' : 'description');
    }

}
