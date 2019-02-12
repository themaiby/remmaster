export enum ISnackbarColors {
  err = 'error',
  warn = 'warning',
  success = 'success',
  info = 'info',
  secondary = 'secondary',
  primary = 'primary',
}

export class Snackbar {
  show: boolean = false;
  y: string = 'top';
  x: string = 'right';
  mode: string = '';
  timeout: number = 3000;
  text: string = 'Application loaded';
  color: ISnackbarColors = ISnackbarColors.primary;

  call(text: string, color: ISnackbarColors, timeout: number = 3000) {
    this.show = true;
    this.text = text;
    this.timeout = timeout;
    this.color = color;
  }

  hide() {
    this.show = false;
  }
}
