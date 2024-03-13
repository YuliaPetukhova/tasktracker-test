import {Injectable} from '@angular/core';
import {ITask} from '../models/ITask';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {
  }

  saveData(task: ITask) {
    let formDataArray = JSON.parse(localStorage.getItem('tasks')!) || [];
    formDataArray.push(task);
    localStorage.setItem('tasks', JSON.stringify(formDataArray));
  }
}
