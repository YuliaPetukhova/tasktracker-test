import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {TasksService} from "../../../services/tasks.service";
import {ITask} from '../../../models/ITask';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatFormField} from "@angular/material/form-field";
import {
  MatExpansionPanel,
  MatExpansionPanelActionRow,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {DatePipe} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MatGridList,
    MatGridTile,
    MatFormField,
    MatExpansionPanelDescription,
    MatExpansionPanelActionRow,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatIcon,
    DatePipe
  ],
  templateUrl: 'task-page.component.html',
  styleUrl: 'task-page.component.scss'
})
export class TaskPageComponent implements OnInit, OnDestroy {
  task: ITask | undefined;
  subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.task = this.tasksService.findTaskById(params['id'])!;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
