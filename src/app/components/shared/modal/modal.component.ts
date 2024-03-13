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
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {TasksService} from "../../../services/tasks.service";
import {MatDialogClose, MatDialogRef} from '@angular/material/dialog';

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
  ],
  providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  taskForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    protected tasksService: TasksService,
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

  submit() {
    this.submitted = true;

    if (!this.taskForm.valid) {
      return;
    }
    this.tasksService.saveData(this.taskForm.value);

    this.taskForm.reset();

    this.dialogRef.close();
  }
}
