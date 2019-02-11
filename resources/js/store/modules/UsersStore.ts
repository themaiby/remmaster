import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import {User} from "../../models/User";
import {snack} from "../../utils/snack";

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
      console.log(user.data.can('s'));
      this.setCurrentUser(user.data);
    } catch (e) {
      snack.err(e.response.data.message);
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
      snack.err(e.response.data.message);
      this.setErrors(e.response.data.errors);
    } finally {
      this.setIsRequest(false);
    }
  }
}

export const usersStore = getModule(UsersStore);
