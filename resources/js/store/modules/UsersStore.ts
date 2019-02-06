import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import {http} from "../../plugins/axios";
import {apiRoutes} from "../../apiRoutes";
import {AxiosResponse} from "axios";
import IResponse from "../../models/IResponse";
import IResponseError from "../../models/IResponseError";
import {createUserModel, User} from "../../models/User";
import {DateTime} from "../../models/DateTime";

const defaultDateTime: DateTime = {timezone: null, timezone_type: null, date: null};

@Module({name: 'users', store: store, namespaced: true, dynamic: true})
class UsersStore extends VuexModule {
  authorized: boolean = false;
  isRequest: boolean = false;
  currentUser: User = createUserModel({
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    permissions: [],
    roles: [],
    email_verified_at: defaultDateTime,
    created_at: defaultDateTime,
    updated_at: defaultDateTime,
    deleted_at: defaultDateTime,
  });
  message: string = '';
  errors: [] = [];

  @Mutation
  setCurrentUser(user: User) {
    this.currentUser = createUserModel(user);
  }

  @Mutation
  setIsRequest(isRequest: boolean) {
    this.isRequest = isRequest;
  }

  @Mutation
  setAuthorized(authorized: boolean) {
    this.authorized = authorized;
  }

  @Mutation
  setMessage(message: string) {
    this.message = message;
  }

  @Mutation
  setErrors(errors: []) {
    this.errors = errors;
  }

  @Action
  async getCurrentUser() {
    this.setIsRequest(true);
    try {
      const userResp: AxiosResponse<IResponse<User>> = await http.get(apiRoutes.users.current);
      this.setCurrentUser(userResp.data.data);
    } finally {
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
