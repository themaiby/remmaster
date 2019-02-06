import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {apiRoutes} from "../../apiRoutes";
import {store} from "../store";
import ApiResponse from "../../interfaces/IResponse";
import {AxiosResponse} from "axios";
import {http} from "../../plugins/axios";
import {ISnackbar} from "../../interfaces/ISnackbar";
import {createMenuModel, Menu, MenuScheme} from "../../models/Menu";

@Module({name: 'application', store: store, namespaced: true, dynamic: true})
class ApplicationStore extends VuexModule {
  menu: Menu[] = [];
  currentPageTitle: { text: string, image?: string } = {text: '', image: ''};
  currentPageImage: string | null = null;
  drawer: boolean = true;
  errors: [] = [];
  message: string = '';
  loaded: boolean = false;
  requestInProgress: boolean = false;
  itWasTokenRefreshAttempt: boolean = false;
  snackbar: ISnackbar = {show: false, y: 'top', x: 'right', mode: '', timeout: 3000, text: '', color: 'secondary'};

  @Mutation
  setSnackbar(snackbar: ISnackbar) {
    this.snackbar = {...this.snackbar, ...snackbar, show: true};
  }

  @Mutation
  hideSnackbar() {
    this.snackbar = {...this.snackbar, show: false};
  }

  @Mutation
  setTokenRefreshAttempt(attempted: boolean) {
    this.itWasTokenRefreshAttempt = attempted;
  }

  @Mutation
  setCurrentPageTitle(parameters: { text: string, image?: string } = {text: '', image: ''}) {
    this.currentPageTitle = parameters;
  }

  @Mutation
  setDrawer(enabled: boolean) {
    this.drawer = enabled;
  }

  @Mutation
  setAppLoaded(): void {
    this.loaded = true;
  }

  @Mutation
  setMenu(menu: MenuScheme[]) {
    this.menu = menu.map(item => createMenuModel(item));
  }

  @Action
  async getMenu() {
    try {
      const menu: AxiosResponse<ApiResponse<MenuScheme[]>> = await http.get(apiRoutes.app.menu);
      this.context.commit('setMenu', menu.data.data);
    } catch (e) {
    }
    this.context.commit('setAppLoaded');
  }
}

export const applicationStore = getModule(ApplicationStore);
