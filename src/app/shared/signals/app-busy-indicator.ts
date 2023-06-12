import { signal } from '@angular/core';

export interface AppBusyIndicatorStatus {
    visible: boolean;
    text?: string;
}

export const appBusyIndicator = signal<AppBusyIndicatorStatus>({
    visible: false
});

export const showAppBusyIndicator = (text?: string | undefined) =>
    appBusyIndicator.set({ visible: true, text });

export const hideAppBusyIndicator = () => appBusyIndicator.set({ visible: false });
