export interface ISnackbar {
  show?: boolean;
  y?: string | null;
  x?: string | null,
  mode?: string,
  timeout: number;
  text: string;
  color: 'error' | 'warning' | 'success' | 'info' | 'secondary' | 'primary';
}
