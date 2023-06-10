import { Component } from '@angular/core';
import { appBusyIndicator } from '@shared/signals/app-busy-indicator';

@Component({
    selector: 'rs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    get appIsBusy(): boolean {
        return appBusyIndicator();
    }

}
