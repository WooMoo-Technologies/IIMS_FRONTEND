export class ApprovalDialogConfig {
  dialogType: 'Alert' | 'Confirm' | 'Error' | 'Delete';
  title = '';
  message = '';

  constructor(dialogType: 'Alert' | 'Confirm' | 'Error' | 'Delete', title: string, message: string) {
    this.dialogType = dialogType;
    this.title = title;
    this.message = message;
  }
}
