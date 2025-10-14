import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Config header requests where needed.
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /**
   * @description
   *
   */
  get(endpoint: string): Observable<any> {
    if (!endpoint) {
      throw new Error("The 'endpoint' parameter is required.");
    }

    const url = `${this.apiUrl}/${endpoint}`;

    return this.http.get(url);
  }

  /**
   * @description
   *
   */
  getOne(endpoint: string, id: number): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;

    return this.http.get(url);
  }

  /**
   * @description
   *
   */
  post(endpoint: string, data: any, id?: number): Observable<any> {
    let url: string;
    id
      ? (url = `${this.apiUrl}/${endpoint}/${id}`)
      : (url = `${this.apiUrl}/${endpoint}`);
    // Make request
    return this.http.post(url, data, httpOptions);
  }

  /**
   * @description
   *
   */
  update(endpoint: string, data: any, id?: number | string): Observable<any> {
    if (!endpoint) {
      throw new Error("The 'endpoint' parameter is required.");
    }

    const baseUrl = `${this.apiUrl}/${endpoint}`;
    const url = id != null ? `${baseUrl}/${id}` : baseUrl;

    return this.http.patch(url, data, httpOptions);
  }

  /**
   * @description
   *
   */
  delete(endpoint: string, id: number): Observable<any> {
    if (!endpoint || !id) {
      throw new Error("Both 'endpoint' and 'id' are required.");
    }
    const url = `${this.apiUrl}/${endpoint}/${id}`;
    return this.http.delete(url);
  }
}
