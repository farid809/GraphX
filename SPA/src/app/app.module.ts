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
  DetailComponent,
  EntryComponent
} from './components/index';
import {
  BladerModule,
  BladeRegistry,
  BladeMetaData
} from './blader/index';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponentComponent,
    SidebarComponent,
    WorkspaceComponent,
    HomeComponent,
    EntryComponent,
    ListComponent,
    DetailComponent
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
      { path: 'detail', component: DetailComponent },
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
    this._bladeRegistry.register(new BladeMetaData('detail', DetailComponent));
  }
}
