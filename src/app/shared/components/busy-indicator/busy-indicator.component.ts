import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'rs-busy-indicator',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule],
    templateUrl: './busy-indicator.component.html',
    styleUrls: ['./busy-indicator.component.scss']
})
export class BusyIndicatorComponent {

    @Input()
    backdrop: boolean = false;

    @Input()
    fullscreen: boolean = false;

    @Input()
    color: ThemePalette = 'primary';

    @Input()
    text?: string | undefined;

    get optionalClasses(): { [key: string]: boolean } {
        return {
            'rs-fullscreen': this.fullscreen,
            'rs-backdrop': this.backdrop
        };
    }

}
