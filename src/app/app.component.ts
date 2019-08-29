import { Component, OnInit } from '@angular/core';
import { SwapiService } from './swapi.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  public people$: Observable<any>;
  public showNewSection: boolean = false;

  constructor(private _swapi: SwapiService) {}

  ngOnInit() {
    this.people$ = this._swapi.peopleReplay$.pipe(
      finalize(() => {
        console.log('finalized')
      })
    );
    setTimeout(() => this.showNewSection = true, 5000)
  }
}
