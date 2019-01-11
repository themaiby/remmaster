import {Action, Mutation, VuexModule} from "vuex-module-decorators";
import {IApplicationStore} from "../types/ApplicationStore";
import {http} from "../../utils/axios";

class ApplicationStore extends VuexModule implements IApplicationStore {
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
            const menu = await http.get('menu!!');
            /*this.context.commit('setMenu', new Menu(menu.data.data));*/
            this.context.commit('setAppLoaded');
        } catch (e) {
            console.log(e);
        }
    }
}
