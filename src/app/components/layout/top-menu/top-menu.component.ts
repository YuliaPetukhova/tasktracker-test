import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from '@angular/forms';
import {ModalComponent} from "../../shared/modal/modal.component";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    ModalComponent,
  ],
  templateUrl: 'top-menu.component.html',
  styleUrl: 'top-menu.component.scss'
})
export class TopMenuComponent {
  constructor(public dialog: MatDialog) {
  }

  openForm() {
    let dialogRef: MatDialogRef<ModalComponent, any> = this.dialog.open(ModalComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
