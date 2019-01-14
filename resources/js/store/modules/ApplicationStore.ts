import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {http} from "../../utils/axios";
import {api} from "../../utils/api";
import {store} from "../store";
import Menu, {MenuItem} from "../../models/Menu";
import ApiResponse from "../../models/ApiResponse";
import {AxiosResponse} from "axios";

@Module({name: 'application', store: store, namespaced: true, dynamic: true})
class ApplicationStore extends VuexModule {
  errors: [] = [];
  message: string = '';

  loaded: boolean = false;
  menu: Menu = new Menu([]);
  requestInProgress: boolean = false;

  @Mutation setAppLoaded(): void {
    this.loaded = true;
  }

  @Mutation setMenu(menu: Menu) {
    this.menu = menu;
  }

  @Action
  async getMenu() {
    try {
      const menu: AxiosResponse<ApiResponse<MenuItem[]>> = await http.get(api.app.menu);
      this.context.commit('setMenu', new Menu(menu.data.data));
    } catch (e) {
    }
    this.context.commit('setAppLoaded');
  }
}

export const applicationStore = getModule(ApplicationStore);
