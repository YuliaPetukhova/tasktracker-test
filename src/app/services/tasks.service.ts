import {Injectable} from '@angular/core';
import {ITask} from '../models/ITask';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public taskSubject: BehaviorSubject<ITask[] | null>;

  constructor() {
    this.taskSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('tasks')!));
  }

  saveData(task: ITask): void {
    let formDataArray: ITask[] = JSON.parse(localStorage.getItem('tasks')!) || [];

    formDataArray.push(task);
    localStorage.setItem('tasks', JSON.stringify(formDataArray));
    this.taskSubject.next(formDataArray);
  }

  findTaskById(id: number): ITask {
    let localStorageTasks: ITask[] = JSON.parse(localStorage.getItem('tasks')!);
    let localStorageTaskIndex: number = localStorageTasks.findIndex((filteredTask: ITask) => filteredTask.id == id);

    return localStorageTasks[localStorageTaskIndex];
  }

  changeStatus(id: number, value: string): void {
    let localStorageTasks: ITask[] = JSON.parse(localStorage.getItem('tasks')!);

    let localStorageTaskIndex: number = localStorageTasks.findIndex((filteredTask: ITask) => filteredTask.id == id);
    let localStorageTask: ITask = localStorageTasks[localStorageTaskIndex];

    localStorageTask.progress = value;

    localStorageTasks[localStorageTaskIndex] = localStorageTask;
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
  }

  changeUsers(id: number, value: string[]): void {
    let localStorageTasks: ITask[] = JSON.parse(localStorage.getItem('tasks')!);

    let localStorageTaskIndex: number = localStorageTasks.findIndex((filteredTask: ITask) => filteredTask.id == id);
    let localStorageTask: ITask = localStorageTasks[localStorageTaskIndex];

    localStorageTask.users = value;

    localStorageTasks[localStorageTaskIndex] = localStorageTask;
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
  }
}
