import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WatchService {

  constructor(private http: HttpClient) {}
  
  get() {
    return this.http.get(`/api/v1/cards.json`); // TODO: fix endpoint
  }

  add(payload) {
    return this.http.post(`/api/v1/cards.json`, {text: payload.trim()}); // TODO: fix endpoint
  }

  remove(payload) {
    return this.http.delete(`/api/v1/cards/${payload.id}.json`); // TODO: fix endpoint
  }

  update(payload) {
    return this.http.patch(`/api/v1/cards/${payload.id}.json`, payload); // TODO: fix endpoint
  }

}
