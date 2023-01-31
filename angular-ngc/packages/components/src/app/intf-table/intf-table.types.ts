import { TemplateRef } from '@angular/core';

export interface IntfTableColumn {
  title?: string;
  dataIndex: string;
  custom?: TemplateRef<any>;
  sortable?: boolean;
  sortKey?: string;
}

export interface IntfTableColumnSort {
  key: string;
  value: string;
}
