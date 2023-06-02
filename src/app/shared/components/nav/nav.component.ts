import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
    selector: 'rs-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {

    @ViewChild(MatMenuTrigger)
    menuTrigger!: MatMenuTrigger;

}
