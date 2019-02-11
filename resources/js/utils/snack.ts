import {applicationStore} from "../store/modules/ApplicationStore";
import i18n from "../plugins/i18n";

export const snack = {
  success: (text: string, values: object = {}, timeout: number = 3000) => applicationStore.setSnackbar({
    text: i18n.t(text, values) as string,
    color: 'success',
    timeout,
  }),
  warn: (text: string, values: object = {}, timeout: number = 3000) => applicationStore.setSnackbar({
    text: i18n.t(text, values) as string,
    color: 'warning',
    timeout,
  }),
  info: (text: string, values: object = {}, timeout: number = 3000) => applicationStore.setSnackbar({
    text: i18n.t(text, values) as string,
    color: 'primary',
    timeout,
  }),
  secondary: (text: string, values: object = {}, timeout: number = 3000) => applicationStore.setSnackbar({
    text: i18n.t(text, values) as string,
    color: "secondary",
    timeout,
  }),
  err: (text: string, timeout: number = 3000) => applicationStore.setSnackbar({
    text: text,
    color: 'error',
    timeout,
  }),
  custom: (text: string,
           color: 'error' | 'warning' | 'success' | 'info' | 'secondary' | 'primary',
           timeout: number = 3000
  ) => applicationStore.setSnackbar({text, color, timeout}),
};
