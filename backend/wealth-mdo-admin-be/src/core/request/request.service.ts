import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios'; // NOSONAR
import { Logger } from 'ngpd-merceros-logger-be';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable()
export class RequestService {
  private readonly logger = new Logger(RequestService.name);

  constructor(private readonly http: HttpService) {
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Observable<T> {
    this.logger.log(url, RequestService.getLoggerContext('GET'));
    return this.http.get<T>(url, config).pipe(pluck('data'));
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<T> {
    this.logger.log(url, RequestService.getLoggerContext('POST'));
    return this.http.post<T>(url, data, config).pipe(pluck('data'));
  }

  request<T = any>(config: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    this.logger.log(config, RequestService.getLoggerContext(config.method || 'GET'));
    return this.http.request(config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    this.logger.log(url, RequestService.getLoggerContext('DELETE'));
    return this.http.delete<T>(url, config);
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    this.logger.log(url, RequestService.getLoggerContext('HEAD'));
    return this.http.head<T>(url, config);
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<T> {
    this.logger.log(url, RequestService.getLoggerContext('PUT'));
    return this.http.put<T>(url, data, config).pipe(pluck('data'));
  }

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<T> {
    this.logger.log(url, RequestService.getLoggerContext('PATCH'));
    return this.http.patch<T>(url, data, config).pipe(pluck('data'));
  }

  private static getLoggerContext(context: string) {
    return `${RequestService.name}.${context}`;
  }
}
