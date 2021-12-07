import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'https://backend.scanwich.in/api/analytics/';

  private extractData(res: Response): Response | null {
    const body = res;
    return body || null;
  }


  constructor(private http: HttpClient) { }
  
  public getLastMonthTraffic(): Observable<any> {
    return this.http
      .get(this.url + 'getLastMonthTraffic ')
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

    
  public getAmountAndOrderInfo(): Observable<any> {
    return this.http
      .get(this.url + 'getAmountAndOrderInfo ')
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }    

  public getOverallTrafficTrend(): Observable<any> {
    return this.http
      .get(this.url + 'getOverallTrafficTrend ')
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }
  
  public getSupplierAmountAndOrderTrend(id): Observable<any> {
    return this.http
      .post(this.url + 'getSupplierAmountAndOrderTrend ',{supplier_id:id})
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }
  
  handleError(error): Observable<never> {
    return throwError(error);
  }


}
