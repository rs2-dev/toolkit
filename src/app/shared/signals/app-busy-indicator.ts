import { signal } from '@angular/core';

export interface AppBusyIndicatorStatus {
    visible: boolean;
    text?: string;
}

export const appBusyIndicator = signal<AppBusyIndicatorStatus>({
    visible: false
});

export const showAppBusyIndicator = (text?: string | undefined) =>
    setTimeout(() => appBusyIndicator.set({ visible: true, text }), 0);

export const hideAppBusyIndicator = () =>
    setTimeout(() => appBusyIndicator.set({ visible: false }), 0);
