import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CatalogComponent} from "./components/pages/catalog/catalog.component";
import {TaskPageComponent} from "./components/pages/task-page/task-page.component";
import {TopMenuComponent} from "./components/layout/top-menu/top-menu.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatalogComponent, TaskPageComponent, RouterLink, RouterLinkActive, TopMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
}
