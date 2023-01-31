import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class TenantIdService {
  public tenantId: string;
  public tenantName: string = '';

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.tenantId = document.location.pathname.match(/^\/([^\/]*).*$/)[1];
  }

  public setTenantName(name: string) {
    this.tenantName = name;
  }
}
