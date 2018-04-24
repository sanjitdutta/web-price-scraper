import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { ApiResponse } from './api-response';

@Injectable()
export class WatchService {

  constructor(private http: HttpClient) {}
  
  get() {
    return this.http.get(`/api/watches`).map((res: ApiResponse) => {
      return res.data;
    });
  }

  post(payload) {
    return this.http.post(`/api/watches`, {text: payload.trim()}); // TODO: fix endpoint
  }

  delete(payload) {
    return this.http.delete(`/api/watch/${payload.id}`); // TODO: fix endpoint
  }

  put(payload) {
    return this.http.put(`/api/watch/${payload.id}`, payload); // TODO: fix endpoint
  }

}
