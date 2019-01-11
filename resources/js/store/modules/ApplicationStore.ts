import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {http} from "../../utils/axios";
import urls from "../../utils/urls";
import {store} from "../store";
import Menu from "../../models/Menu";
import ApiResponse from "../../models/ApiResponse";

@Module({name: 'application', store: store, namespaced: true, dynamic: true})
class ApplicationStore extends VuexModule {
    errors: [] = [];
    loaded: boolean = false;
    menu: object = {};
    message: string = '';
    requestInProgress: boolean = false;

    @Mutation setAppLoaded(): void {
        this.loaded = true;
    }

    @Mutation setMenu(menu: object) {
        this.menu = menu;
    }

    @Action async getMenu() {
        try {
            const menuResponse = new ApiResponse<Menu>(
                await http.get(urls.app.menu)
            );
            this.context.commit('setMenu', menuResponse.data);
        } catch (e) {
        }
        this.context.commit('setAppLoaded');
    }
}

export const applicationStore = getModule(ApplicationStore);
