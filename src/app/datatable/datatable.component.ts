

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-my-component',
  template: `
    <ngx-datatable
      class="bootstrap table table-striped"
      [rows]="rows"
      [columns]="columns"
      [columnMode]="'force'"
      [headerHeight]="50"
      [footerHeight]="50"
      [rowHeight]="'auto'"
      [externalPaging]="true"
      [externalSorting]="true"
      [count]="page.count"
      [offset]="page.offset"
      [limit]="page.limit"
      [sortType]="'single'"
      (page)="pageCallback($event)"
      (sort)="sortCallback($event)"
    ></ngx-datatable>
  `
})
export class DatatableComponent implements OnInit {
  page = {
    limit: 10,
    count: 0,
    offset: 0,
    orderBy: 'city',
    orderDir: 'desc'
  };

  rows: Object[];

  columns = [
    { name: 'city' },
    { name: 'contact' },
    { name: 'country' },
  ];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.pageCallback({ offset: 0 });
  }

  /**
   * Called whenever the user changes page
   *
   * check: https://swimlane.gitbooks.io/ngx-datatable/content/api/table/outputs.html
   */
  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.reloadTable();
  }

  /**
   * Called whenever the user changes the sort order
   *
   * check: https://swimlane.gitbooks.io/ngx-datatable/content/api/table/outputs.html
   */
  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    // there will always be one "sort" object if "sortType" is set to "single"
    this.page.orderDir = sortInfo.sorts[0].dir;
    this.page.orderBy = sortInfo.sorts[0].prop;
    this.reloadTable();
  }

  /**
   * You will render the table once at the beginning in ngOnInit()
   * and then every time the page OR the sort order are changed
   */
  reloadTable() {

    // NOTE: those params key values depends on your API!
    const params = new HttpParams()
      .set('orderColumn', `${this.page.orderBy}`)
      .set('orderDir', `${this.page.orderDir}`)
      .set('pageNumber', `${this.page.offset}`)
      .set('pageSize', `${this.page.limit}`);

    this.httpClient.get(`https://data.nasa.gov/resource/9g7e-7hzz.json/`, { params })
      .subscribe((data) => {
         console.log(data);
        // NOTE: the format of the returned data depends on your API!
       // this.page.count = data.count;
       // this.rows = data.rows;
      });
  }
}