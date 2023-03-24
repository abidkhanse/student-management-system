import { Component, Inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule, MAT_SNACK_BAR_DATA,MatSnackBarRef  } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PopupMessageService {
  
//****** Standard message template starts *****/

  config?: MatSnackBarConfig

  constructor(private snackbar: MatSnackBar) {

    this.config = new MatSnackBarConfig()
    this.config.horizontalPosition = "center"
    this.config.verticalPosition = "bottom"
    this.config.duration = 3000

  }

  _successMessage({ message }: { message: string; }) {
      this.snackbar.open(message, '', { ...this.config, panelClass: "success-snackbar" });
  }

  _errorMessage({ message }: { message: string; }) {
    this.snackbar.open(message, '', { ...this.config, panelClass: "error-snackbar" });
  }

  _warningMessage({ message }: { message: string; }) {
    this.displayMessageWithComponenet({text:message, type:PopUpType.WARNING},"warning-snackbar")
  }

//****** Standard message template ends *****/


messageWithAction(message: string, action: string) {

  this.snackbar.open(message, 'x', {
    duration: 3000,
    verticalPosition: 'bottom',
    panelClass: ['mat-toolbar', 'mat-warn']
  });
}

//****** Custom message template starts *****/

  successMessage({ message }: { message: string; }) {
    
    this.displayMessageWithComponenet({text:message, type:PopUpType.SUCCESS},"success-snackbar")
  
    this.snackbar.open(message, '', { ...this.config, panelClass: "success-snackbar" });
  
  }

  errorMessage({ message }: { message: string; }) {
    this.displayMessageWithComponenet({text:message, type:PopUpType.ERROR},"error-snackbar")
    this.snackbar.open(message, '', { ...this.config, panelClass: "error-snackbar" });
  }

  warningMessage({ message }: { message: string; }) {
    this.displayMessageWithComponenet({text:message, type:PopUpType.WARNING},"warning-snackbar")
  }


  displayMessageWithComponenet(popup: PopUp, panelClass: string ) {
    this.snackbar.openFromComponent(
      CustomSnackbarComponenet,
      {

        duration: 5000,
        horizontalPosition: "center",
        verticalPosition:'bottom',
        data: popup,
        panelClass
      }
    )
  }
 
}

interface PopUp{
  text: string;
  type:PopUpType;
}

enum PopUpType {
  ERROR="ERROR",
  SUCCESS="SUCCESS",
  WARNING="WARNING",
}

@Component({
  selector: 'custom-popup-message',
  template: `
  <span  > {{data?.text}} </span>
  <mat-icon *ngIf="data?.type===PopUpType.ERROR" style="position:absolute;left:15px; bottom:12px" aria-label="Example home icon">error</mat-icon>
  <mat-icon  *ngIf="data?.type===PopUpType.WARNING" style="position:absolute;left:15px; bottom:12px" aria-label="Example home icon">warning</mat-icon>
  <mat-icon  *ngIf="data?.type===PopUpType.SUCCESS" style="position:absolute;left:15px; bottom:12px" aria-label="Example home icon">check_circle</mat-icon>
  <mat-icon  (click)="closeSnackBar()"  style="position:absolute;right:15px; bottom:12px" aria-label="Example home icon">clear</mat-icon>
  `
})
export class CustomSnackbarComponenet {
  public data?: PopUp;
  PopUpType = PopUpType;
  
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public dataP: PopUp,
     private snackBarRef: MatSnackBarRef<CustomSnackbarComponenet>,
    ) {
    console.log(dataP);
    this.data = dataP;
  }

  closeSnackBar():void {
    this.snackBarRef.dismiss();
  }
}

//****** Custom message template ends *****/