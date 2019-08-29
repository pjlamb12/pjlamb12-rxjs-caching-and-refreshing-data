import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, combineLatest, defer, isObservable, of } from 'rxjs';
import { 
  map, 
  tap, 
  shareReplay, 
  flatMap, 
  startWith, 
  timeout, 
  first, 
  mergeMap
  } from 'rxjs/operators';

@Injectable()
export class SwapiService {
  private baseUrl: string = 'https://swapi.co/api'
  public people$: Observable<any>;

  constructor(private _http: HttpClient) { }

  public shared$: Observable<any>;

  createShared = () => this.shared$ = this._http.get(`${this.baseUrl}/people`).pipe(
    map((data: any) => {
      const random = Math.floor(Math.random() * 6)
      return data.results[random]
    }),
    shareReplay(1, 2500)
  )

  public cachedRefreshable$ = this.createShared().pipe(
    first(null, defer(() => this.createShared())),
    mergeMap(d => isObservable(d) ? d : of(d))
  )

  public peopleReplay$ = this.cachedRefreshable$;
}