import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import { OpenRs2Service } from '../../../../shared/services/open-rs2/open-rs2.service';
import { OpenRs2Build, OpenRs2Cache } from '../../../../shared/services/open-rs2/open-rs2.model';

@Component({
    selector: 'rs-open-rs2-search',
    templateUrl: './open-rs2-search.component.html',
    styleUrls: ['./open-rs2-search.component.scss']
})
export class OpenRs2SearchComponent implements AfterViewInit {

    @ViewChild(MatTable)
    cacheListTable!: MatTable<any>;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    readonly displayedColumns: string[] = [
        'game', 'builds', 'timestamp', 'actions'
    ];

    dataSource!: MatTableDataSource<OpenRs2Cache>;
    filteredData: OpenRs2Cache[] = [];
    data: OpenRs2Cache[] = [];

    games: string[] = [];

    currentSort: Sort = {
        active: 'builds',
        direction: 'desc'
    };
    currentSearch: string = '';
    currentGame: string = 'runescape';

    constructor(private openRs2Service: OpenRs2Service) {
    }

    async ngAfterViewInit(): Promise<void> {
        this.filteredData = await this.openRs2Service.getAvailableCaches();

        this.data = JSON.parse(JSON.stringify(this.filteredData));

        this.games = [...new Set(this.data.map(d => d.game))] as string[];

        this.dataSource = new MatTableDataSource(this.filteredData);

        this.filterData(false);

        this.dataSource.paginator = this.paginator;
    }

    searchChanged(): void {
        this.filterData();
    }

    gameChanged(): void {
        this.filterData();
    }

    sortChanged(sort: Sort): void {
        this.currentSort = sort;
        this.filterData();
    }

    filterData(render: boolean = true): void {
        if (this.currentSearch?.length) {
            this.filteredData = this.data.filter(cache => {
                const builds = this.openRs2Service.formatBuilds(cache.builds);
                return builds.startsWith(this.currentSearch) || builds.endsWith(this.currentSearch) || builds.includes(this.currentSearch);
            });
        } else {
            this.filteredData = this.data;
        }

        if (this.currentGame?.length) {
            this.filteredData = this.filteredData.filter(cache => cache.game === this.currentGame);
        }

        this.filteredData = this.openRs2Service.sortCaches(this.filteredData, this.currentSort.active, this.currentSort.direction);

        this.dataSource.data = this.filteredData;

        if (render) {
            this.cacheListTable.renderRows();
        }
    }

    formatBuilds(builds: OpenRs2Build[]): string {
        return this.openRs2Service.formatBuilds(builds);
    }

}
