import { Component } from '@angular/core';
import { TitleService } from 'src/app/core/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _titleService: TitleService,) { }

  ngOnInit(): void {
    this._titleService.init();
  }
}
