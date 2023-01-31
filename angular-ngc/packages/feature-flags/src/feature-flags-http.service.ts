import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFeatureFlags } from './feature-flags.interface';

@Injectable()
export class FeatureFlagsHttpService {
  constructor(private http: HttpClient) {}

  getFeatures$(url: string): Observable<Array<IFeatureFlags>> {
    return this.http.get<IFeatureFlags[]>(url);
  }
}
