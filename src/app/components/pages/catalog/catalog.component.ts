import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {ITask} from '../../../models/ITask';
import {MatButton} from "@angular/material/button";

const TASKS: ITask[] = [
  {
    id: 1,
    header: 'Задача',
    title: 'Погулять',
    deadline: '12.03.2024',
    priority: 'срочно',
    progress: 50,
    users: [
      'Юлия',
      'Гарри',
    ],
  },
  {
    id: 2,
    header: 'Задача 2',
    title: 'Поспать',
    deadline: '16.03.2024',
    priority: 'через неделю',
    progress: 9,
    users: ['Джеймс'],
  },
  {
    id: 3,
    header: 'Задача 3',
    title: 'Пожить',
    deadline: '15.03.2024',
    priority: 'завтра',
    progress: 100,
    users: [
      'Гарри',
      'Джеймс',
    ],
  },
]

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatButton,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements AfterViewInit {
  displayedColumns: string[] = ['header', 'title', 'deadline', 'priority', 'progress', 'users', 'actions'];

  dataSource: MatTableDataSource<ITask>;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(TASKS);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
