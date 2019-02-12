import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import {applicationStore} from "./ApplicationStore";
import {ISnackbarColors} from "../../models/Snackbar";
import {User} from "../../models/User";

@Module({name: 'users', store: store, namespaced: true, dynamic: true})
class UsersStore extends VuexModule {
  currentUser: User = new User;
  authorized: boolean = false;
  isRequest: boolean = false;
  message: string | null = null;
  errors: [] | null = null;

  @Mutation setCurrentUser(user: User) {
    this.currentUser = user;
  }

  @Mutation setIsRequest(isRequest: boolean) {
    this.isRequest = isRequest;
  }

  @Mutation setAuthorized(authorized: boolean) {
    this.authorized = authorized;
  }

  @Mutation setMessage(message: string) {
    this.message = message;
  }

  @Mutation setErrors(errors: []) {
    this.errors = errors;
  }

  @Action
  async getCurrentUser() {
    this.setIsRequest(true);
    try {
      const user = await User.getCurrent();
      this.setCurrentUser(user.data);
    } catch (e) {
      applicationStore.snackbar.call(e.response.data.message, ISnackbarColors.err);
    } finally {
      this.setIsRequest(false);
    }
  }

  @Action
  async loginRequest({email, password}: { email: string, password: string }) {
    this.setIsRequest(true);
    this.setMessage('');
    try {
      await User.login({email, password});
      this.setAuthorized(true);
      await this.getCurrentUser();
    } catch (e) {
      applicationStore.snackbar.call(e.response.data.message, ISnackbarColors.err);
      this.setErrors(e.response.data.errors);
    } finally {
      this.setIsRequest(false);
    }
  }
}

export const usersStore = getModule(UsersStore);
