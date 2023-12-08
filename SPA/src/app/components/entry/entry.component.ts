import { Component, HostListener, QueryList, ViewChildren, AfterViewInit, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideNavService } from '../../side-nav.service';
import { RefreshService } from '../../refresh.service';


import {
  Blade,
  BladeManager
} from '../../blader/index';
import { GraphService } from '../../graph.service';
import { MockDataModule } from '../../mock-data/mock-data.module';
import { MockService } from '../../mock.service';

@Component({
  selector: 'tw-entry',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.less'

})
export class EntryComponent implements Blade, OnInit, AfterViewInit {
  public id: number;
  public targetGraphViewId: number;
  public title = 'Data {}';
  public isDirty = false;

  public currentPanel = 'explorer';

  private navigationSubscription: Subscription;
  private refreshSubscription: Subscription;

  private monacoEditor: monaco.editor.IStandaloneCodeEditor;
  editorOptions = { theme: 'vs-light', language: 'json' };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';

  public constructor(
    private _mgr: BladeManager,
    private sideNavService: SideNavService,
    private refreshService: RefreshService,
    private graphService: GraphService,
    private mockDataService: MockService
  ) { }
  ngAfterViewInit(): void {
    this.currentPanel='explorer';
  }

  ngOnInit(): void {

    this.code=JSON.stringify(this.mockDataService.getMockCode(), null, 2);


    this.navigationSubscription = this.sideNavService.activatePanel.subscribe((panel) => {
      this.currentPanel = panel;
      setTimeout(() => {
        this.refresh();


      }, 1);



    })

    this.refreshSubscription = this.refreshService.getRefreshObservable().subscribe(() => {
      setTimeout(() => {
        this.refresh();


      }, 1)


    });

  }

  renderGraph(key){
    console.log("render graph")

   
  
    this.clicked(key)
    this.graphService.setJsonData(this.code)
    this._mgr.select(this.targetGraphViewId);
  }

  refresh() {

    this.monacoEditor.layout();


  }

  public clicked(key: string): void {

    if(!this._mgr.exists(this.targetGraphViewId)){
    this._mgr.reset();
    
    if (key === 'list') {
     this.targetGraphViewId= this._mgr.addWithParams({
        key,
        params: [
          { key: 'viewDefId', value: 'ProductListViewDef' }
        ]
      });
    } else if (key === 'lazy') {
     this.targetGraphViewId= this._mgr.addWithParams({ key });
    } else {
     this.targetGraphViewId= this._mgr.addWithParams({
        key,
        params: [
          { key: 'viewDefId', value: 'ProductViewDef' },
          { key: 'objKey', value: 'Product(1)' }
        ]
      });
    }
  }
  
  setTimeout(()=>{
    this._mgr.select(this.targetGraphViewId);
    this._mgr.select(this.targetGraphViewId);
  },20)
    
  

  
  }



  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this.monacoEditor = editor;
    setTimeout(() => {
      this.refresh();


    }, 1);
  }

}
