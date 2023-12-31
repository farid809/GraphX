import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponentComponent } from './demo-component/demo-component.component';
import { SidebarComponent, WorkspaceComponent } from './shared/index';
import { RouterModule, PreloadAllModules, Route } from '@angular/router';


import {
  HomeComponent,
  ListComponent,
  GraphViewComponent,
  EntryComponent
} from './components/index';
import {
  BladerModule,
  BladeRegistry,
  BladeMetaData
} from './blader/index';
import { DetailViewComponent } from './components/DetailView/detail-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponentComponent,
    SidebarComponent,
    WorkspaceComponent,
    HomeComponent,
    EntryComponent,
    ListComponent,
    GraphViewComponent,
    DetailViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    HttpClientModule,
    BladerModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'list', component: ListComponent },
      { path: 'detail', component: GraphViewComponent },
      { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule) }
    ], { preloadingStrategy: PreloadAllModules })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  public constructor(
    private _bladeRegistry: BladeRegistry
  ) {
    this._bladeRegistry.register(new BladeMetaData('entry', EntryComponent));
    this._bladeRegistry.register(new BladeMetaData('list', ListComponent));
    this._bladeRegistry.register(new BladeMetaData('detail', GraphViewComponent));
    this._bladeRegistry.register(new BladeMetaData('detailView', DetailViewComponent));
  }
}
