import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import {http} from "../../plugins/axios";
import {apiRoutes} from "../../apiRoutes";
import {AxiosResponse} from "axios";
import IResponse from "../../models/IResponse";
import IResponseError from "../../models/IResponseError";
import {createUserModel, defaultUserModel, User, UserScheme} from "../../models/User";

@Module({name: 'users', store: store, namespaced: true, dynamic: true})
class UsersStore extends VuexModule {
  authorized: boolean = false;
  isRequest: boolean = false;
  currentUser: User = createUserModel(defaultUserModel);
  message: string | null = null;
  errors: [] | null = null; // todo: make model

  @Mutation setCurrentUser(user: UserScheme) {
    this.currentUser = createUserModel(user);
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
      const userResp: AxiosResponse<IResponse<UserScheme>> = await http.get(apiRoutes.users.current);
      this.setCurrentUser(userResp.data.data);
    } finally { /* todo: add catch */
      this.setIsRequest(false);
    }
  }

  @Action
  async loginRequest({email, password}: { email: string, password: string }) {
    // start request
    this.setIsRequest(true);
    this.setMessage('');

    // Try to login
    try {
      await http.post(apiRoutes.users.login, {email, password});
      this.setAuthorized(true);
      await this.getCurrentUser();
    } catch (e) {
      const err: IResponseError = e;
      this.setMessage(err.response.data.message);
      this.setErrors(err.response.data.errors);

    } finally {
      this.setIsRequest(false);
    }
  }
}

export const usersStore = getModule(UsersStore);
