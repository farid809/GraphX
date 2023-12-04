import { Component } from '@angular/core';
import { SideNavService } from '../../side-nav.service';

@Component({
  selector: 'tw-sidebar',
  host: { 'class': 'sidebar' },
  template: `
 <!--  <div class="sidebar-header">
     
   </div> -->
   <div class="sidebar-content " >
   <div class="col-md-6 md-auto">

   <button  class="btn icon-btn my-2 "  (click)="showPanel('explorer')">
   <i class="fas fa-code fa-2xl" [class.active-panel]="isActivePanel('explorer')"></i> <!-- FontAwesome icon for Explorer -->
 </button>
 <button   class="btn icon-btn my-2"  (click)="showPanel('search')">
   <i class="fas fa-search fa-2xl" [class.active-panel]="isActivePanel('search')"></i> <!-- FontAwesome icon for Search -->
 </button>
 </div>

 <!--  <ul class="sidebar-nav ">
   
 
      <li routerLinkActive="active">
        <a routerLink="/home">Home</a>
      </li>
      <li routerLinkActive="active">
        <a routerLink="/list">List</a>
      </li>
      <li routerLinkActive="active">
        <a routerLink="/detail">Detail</a>
      </li>
      <li routerLinkActive="active">
        <a routerLink="/blader/entry">Blader</a>
      </li>
     </ul>
   </div>
   <div class="sidebar-footer"></div> -->`
})
export class SidebarComponent {

  currentPanel = 'explorer';


  constructor(private sideNavService: SideNavService)
  {}
  showPanel(panelName: string) {
    this.currentPanel = panelName;
    this.sideNavService.navigate(panelName);
  }

  isActivePanel(panelName: string): boolean {
    return this.currentPanel === panelName;
  }
}
