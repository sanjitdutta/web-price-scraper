import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { ApiResponse } from './api-response';

@Injectable()
export class WebsiteService {

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(`/api/websites`).map((res: ApiResponse) => {
      return res.data;
    });
  }

}
