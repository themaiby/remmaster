import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import {Menu} from "../../models/Menu";
import {ISnackbarColors, Snackbar} from "../../models/Snackbar";

@Module({name: 'application', store: store, namespaced: true, dynamic: true})
class ApplicationStore extends VuexModule {

  menu: Menu[] = [];
  snackbar: Snackbar = new Snackbar();

  currentPageTitle: { text: string, image?: string } = {text: '', image: ''};
  currentPageImage: string | null = null;
  drawer: boolean = true;
  errors: [] = [];
  message: string = '';
  loaded: boolean = false;
  requestInProgress: boolean = false;
  itWasTokenRefreshAttempt: boolean = false;

  @Mutation hideSnackbar() {
    this.snackbar = new Snackbar();
  }

  @Mutation setTokenRefreshAttempt(attempted: boolean) {
    this.itWasTokenRefreshAttempt = attempted;
  }

  @Mutation setCurrentPageTitle(parameters: { text: string, image?: string } = {text: '', image: ''}) {
    this.currentPageTitle = parameters;
  }

  @Mutation setDrawer(enabled: boolean) {
    this.drawer = enabled;
  }

  @Mutation setAppLoaded(): void {
    this.loaded = true;
  }

  @Mutation setMenu(menu: Menu[]) {
    this.menu = menu;
  }

  @Action
  async getMenu() {
    try {
      const menu = await Menu.get();
      console.log(menu);
      this.setMenu(menu.data);
    } catch (e) {
      this.snackbar.call(e.response.data.message, ISnackbarColors.err);
    }
    this.setAppLoaded();
  }
}

export const applicationStore = getModule(ApplicationStore);
