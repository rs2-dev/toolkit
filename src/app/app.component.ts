import { Component } from '@angular/core';
import { appBusyIndicator, AppBusyIndicatorStatus } from '@shared/signals/app-busy-indicator';

@Component({
    selector: 'rs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    get appBusyIndicator(): AppBusyIndicatorStatus {
        return appBusyIndicator();
    }

}
