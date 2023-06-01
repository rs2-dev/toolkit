import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OpenRs2Service } from '../../../../services/open-rs2/open-rs2.service';
import { OpenRs2BuildNumber, OpenRs2FileStore } from '../../../../services/open-rs2/open-rs2.model';
import { Sort } from '@angular/material/sort';
import { lastValueFrom, map } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'rs-open-rs2-search',
    templateUrl: './open-rs2-search.component.html',
    styleUrls: ['./open-rs2-search.component.scss']
})
export class OpenRs2SearchComponent implements OnInit, AfterViewInit {

    @ViewChild(MatTable)
    fileStoreTable!: MatTable<any>;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    readonly displayedColumns: string[] = [
        'game', 'builds', 'timestamp', 'actions'
    ];

    dataSource!: MatTableDataSource<OpenRs2FileStore>;
    filteredData: OpenRs2FileStore[] = [];
    data: OpenRs2FileStore[] = [];

    games: string[] = [];

    currentSort: Sort = {
        active: 'builds',
        direction: 'desc'
    };
    currentSearch: string = '';
    currentGame: string = 'runescape';

    constructor(private openRS2Service: OpenRs2Service) {
    }

    async ngOnInit() {
        const savedFileStoresStr = localStorage.getItem('openrs2_file_stores');
        if (savedFileStoresStr) {
            try {
                this.filteredData = JSON.parse(savedFileStoresStr);
            } catch (e) {
                console.error(`Error loading cached file store data`, e);
            }
        }

        if (!this.filteredData?.length) {
            this.filteredData = await lastValueFrom(this.openRS2Service.getAvailableFileStores());
            localStorage.setItem('openrs2_file_stores', JSON.stringify(this.filteredData));
        }

        this.data = JSON.parse(JSON.stringify(this.filteredData));

        this.games = [...new Set(this.data.map(d => d.game))] as string[];

        this.dataSource = new MatTableDataSource(this.filteredData);

        this.filterData(false);
    }

    ngAfterViewInit() {
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
            this.filteredData = this.data.filter(fileStore => {
                const builds = this.openRS2Service.formatBuilds(fileStore.builds);
                return builds.startsWith(this.currentSearch) || builds.endsWith(this.currentSearch) || builds.includes(this.currentSearch);
            });
        } else {
            this.filteredData = this.data;
        }

        if (this.currentGame?.length) {
            this.filteredData = this.filteredData.filter(fileStore => fileStore.game === this.currentGame);
        }

        this.filteredData = this.openRS2Service.sortFileStores(this.filteredData, this.currentSort.active, this.currentSort.direction);

        this.dataSource.data = this.filteredData;

        if (render) {
            this.fileStoreTable.renderRows();
        }
    }

    formatBuilds(builds: OpenRs2BuildNumber[]): string {
        return this.openRS2Service.formatBuilds(builds);
    }

}
