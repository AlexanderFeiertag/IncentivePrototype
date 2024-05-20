import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {AfterViewInit, Component, Inject, ViewChild} from "@angular/core";
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckbox} from "@angular/material/checkbox";
import {NgClass, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatProgressBar, MatProgressBarModule} from "@angular/material/progress-bar";
import {interval, Subscription} from 'rxjs';

export interface StatusDialogData {
  successful: true;
  title: string;
  message: string;
  duration: number;
}

@Component({
  selector: 'status-dialog',
  templateUrl: 'status-dialog.html',
  styleUrl: './status-dialog.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCheckbox,
    NgClass,
    MatIcon,
    NgIf,
    MatProgressBarModule,
  ],
})
export class StatusDialog implements AfterViewInit {

  @ViewChild(MatProgressBar) progressBar: MatProgressBar | undefined;
  progressbarValue = 100;
  curSec: number = 0;

  constructor(public dialogRef: MatDialogRef<StatusDialogData>,
              @Inject(MAT_DIALOG_DATA) public data: StatusDialogData) {
  }

  ngAfterViewInit() {
    if (this.data.successful) {
      this.startTimer(this.data.duration / 1000);
    }
  }

  startTimer(seconds: number) {
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue = 100 - sec * 100 / seconds;
      this.curSec = sec;

      if (this.curSec === seconds) {
        sub.unsubscribe();
        this.dialogRef.close();
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
