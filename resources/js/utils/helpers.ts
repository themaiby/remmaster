import {applicationStore} from "../store/modules/ApplicationStore";

export const setCurrentPageTitle = (title: string) => {
  applicationStore.setCurrentPageTitle(title);
};
