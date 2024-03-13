import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from "@angular/common";
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-top-menu',
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

  ],
  providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent implements OnInit {
  showForm = false;
  taskForm: FormGroup;
  submitted = false;

  tasks: [];

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
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
    console.log(this.taskForm.value);

    this.saveData();

    this.taskForm.reset();

    this.toggleForm();

    // this.loadData();
  }

  saveData() {
    let formDataArray = JSON.parse(localStorage.getItem('tasks')!) || [];
    formDataArray.push(this.taskForm.value);
    localStorage.setItem('tasks', JSON.stringify(formDataArray));
  }

  loadData() {
    // Получение данных из localStorage
    const savedData = localStorage.getItem('taskForm');
    if (savedData) {
      this.taskForm = JSON.parse(savedData);
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
