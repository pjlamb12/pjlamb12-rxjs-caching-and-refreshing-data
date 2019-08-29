import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SwapiService } from './swapi.service';

@Component({
  selector: 'hello',
  template: `
    <h1>Hello {{name}}!</h1>
    <p>People from hello.component {{ people$ | async | json }}</p>
  `,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent implements OnInit {
  @Input() name: string;
  public people$: Observable<any>;

  constructor(private _swapi: SwapiService) {}

  ngOnInit() {
    this.people$ //= this._swapi.peopleReplay$;
  }
}
