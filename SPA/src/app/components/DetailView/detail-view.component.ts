import { Component } from '@angular/core';

import { Blade } from './../../blader/index';

@Component({
  selector: 'tw-detail',
  templateUrl: './graph-view.component.html',
  styleUrl: './graph-view.component.less'
})
export class DetailViewComponent implements Blade {
  public id: number;
  public title = 'Detail blade';
  public isDirty = false;
}
