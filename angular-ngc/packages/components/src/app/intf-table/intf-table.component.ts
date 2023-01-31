import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { IntfTableColumn } from './intf-table.types';
import { IntfTableDensityTogglerService } from '@intf/components/intf-table/intf-table-density-toggler';
import { NzSizeMDSType } from 'ng-zorro-antd/core';

/**
 * @deprecated 04/02/2021. Use Material Design Table instead.
 */
@Component({
  selector: 'intf-table',
  styles: [
    `
      .table-header {
        border: none;
      }

      .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    `,
  ],
  template: `
    <nz-table
      #intfTable
      [ngClass]="{
        'intf-table-size-small': size === 'small',
        'intf-table-size-middle': size === 'middle',
        'intf-table-size-compact': size != 'default'
      }"
      [nzData]="dataSource"
      [nzNoResult]="noResult"
      [nzLoading]="loading"
      [nzLoadingIndicator]="loader"
      [nzPageSize]="pageSize"
      [nzShowPagination]="showPagination"
      [nzFrontPagination]="frontPagination"
      [nzFooter]="footer"
    >
      <thead (nzSortChange)="sortColumn($event)" nzSingleSort="true">
        <tr>
          <th
            class="table-header"
            *ngFor="let col of columns"
            [nzShowSort]="col.sortable || false"
            [nzSortKey]="col.sortKey || null"
            scope="col"
          >
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of intfTable.data">
          <ng-container *ngFor="let col of columns">
            <ng-container *ngIf="col.custom; else dataIndex">
              <ng-container
                *ngTemplateOutlet="col.custom; context: { $implicit: data }"
              >
              </ng-container>
            </ng-container>
            <ng-template #dataIndex>
              <td>
                {{ data[col.dataIndex] }}
              </td>
            </ng-template>
          </ng-container>
        </tr>
        <ng-template #noResult>
          <intf-empty
            message="Looks like you're all caught up. Nice."
          ></intf-empty>
        </ng-template>
        <ng-template #loader>
          <div class="loader">
            <intf-icon
              [styles]="{ fontSize: '48px' }"
              icon="loading"
            ></intf-icon>
          </div>
        </ng-template>
      </tbody>
    </nz-table>
  `,
})
export class IntfTableComponent {
  @Input() dataSource: Array<object>;
  @Input() columns: Array<IntfTableColumn>;
  @Input() loading: boolean;
  @Input() size: NzSizeMDSType =
    IntfTableDensityTogglerService.Density.ComfyView;
  @Input() pageSize = 10;
  @Input() showPagination = true;
  @Input() frontPagination = false;
  @Input() footer: string | TemplateRef<void>;

  @Output() sortChange = new EventEmitter();

  sortColumn(e) {
    this.sortChange.emit(e);
  }
}
