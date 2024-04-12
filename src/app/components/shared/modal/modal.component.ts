import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
import {TasksService} from "../../../services/tasks.service";
import {MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {InputMaskModule} from '@ngneat/input-mask';
import {userList} from "../../../data/userList";
import {progressList} from "../../../data/progressList";
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    NgOptimizedImage,
    MatDialogClose,
    InputMaskModule,
    MatCardModule
  ],
  providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'}],
  templateUrl: 'modal.component.html',
  styleUrl: 'modal.component.scss'
})
export class ModalComponent {
  errorMessage: string = 'Заполните поле';
  taskForm: FormGroup;
  submitted: boolean = false;

  usersList: string[] = userList;
  progressList: string[] = progressList;
  minDate: Date = new Date();
  maxDate: Date = new Date(2030, 0, 1);

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private dialogRef: MatDialogRef<ModalComponent>,
  ) {
    this.taskForm = this.formBuilder.group({
      header: [null, Validators.required],
      title: [null, Validators.required],
      deadline: [null, Validators.required],
      priority: [null, Validators.required],
      progress: [null, Validators.required],
      users: [null, Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.taskForm.valid) {
      alert('Ошибка заполнения формы. Проверьте все поля, пожалуйста')
      return;
    }

    this.tasksService.saveData({...this.taskForm.value, id: Date.now()});

    this.taskForm.reset();

    this.dialogRef.close();
  }
}
