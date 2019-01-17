import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {http} from "../../utils/axios";
import {apiRoutes} from "../../constants";
import {store} from "../store";
import IMenu from "../../models/IMenu";
import ApiResponse from "../../models/IResponse";
import {AxiosResponse} from "axios";

@Module({name: 'application', store: store, namespaced: true, dynamic: true})
class ApplicationStore extends VuexModule {
  currentPageTitle: string = '';
  drawer: boolean = true;
  errors: [] = [];
  message: string = '';
  loaded: boolean = false;
  menu: IMenu[] = [];
  requestInProgress: boolean = false;

  @Mutation
  setCurrentPageTitle(title: string) {
    this.currentPageTitle = title;
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
  setMenu(menu: IMenu[]) {
    this.menu = menu;
  }

  @Action
  async getMenu() {
    try {
      const menu: AxiosResponse<ApiResponse<IMenu[]>> = await http.get(apiRoutes.app.menu);
      this.context.commit('setMenu', menu.data.data);
    } catch (e) {
    }
    this.context.commit('setAppLoaded');
  }
}

export const applicationStore = getModule(ApplicationStore);
