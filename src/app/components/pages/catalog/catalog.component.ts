import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {ITask} from '../../../models/ITask';
import {MatButton} from "@angular/material/button";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {TasksService} from "../../../services/tasks.service";
import {DatePipe, NgForOf} from "@angular/common";
import {userList} from '../../../data/userList';
import {progressList} from "../../../data/progressList";

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
    RouterLink,
    FormsModule,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    NgForOf,
    DatePipe,
  ],
  templateUrl: 'catalog.component.html',
  styleUrl: 'catalog.component.css'
})
export class CatalogComponent implements AfterViewInit {
  displayedColumns: string[] = ['header', 'title', 'deadline', 'priority', 'progress', 'users', 'actions'];

  users: FormControl<string> = new FormControl();

  usersList: string[] = userList;

  dataSource: MatTableDataSource<ITask>;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  protected readonly progressList: string[] = progressList;

  constructor(private tasksService: TasksService) {
    this.dataSource = new MatTableDataSource(undefined);

    tasksService.taskSubject.subscribe((tasks: ITask [] | null): void => {
      this.dataSource = new MatTableDataSource((tasks as ITask[]))
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onStatusChange($event: MatSelectChange, id: number): void {
    this.tasksService.changeStatus(id, $event.value);
  }

  onUsersChange($event: MatSelectChange, id: number): void {
    this.tasksService.changeUsers(id, $event.value);
  }
}
