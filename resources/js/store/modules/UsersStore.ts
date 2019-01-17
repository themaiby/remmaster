import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import IUser from "../../models/IUser";
import {http, setToken} from "../../utils/axios";
import {apiRoutes} from "../../apiRoutes";
import {AxiosResponse} from "axios";
import IResponse from "../../models/IResponse";
import IResponseError from "../../models/IResponseError";

@Module({name: 'users', store: store, namespaced: true, dynamic: true})
class UsersStore extends VuexModule {
  authorized: boolean = false;
  isRequest: boolean = false;
  currentUser: IUser = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    permissions: [],
    roles: [],
    email_verified_at: {date: '', timezone: '', timezone_type: 0},
    created_at: {date: '', timezone: '', timezone_type: 0},
    updated_at: {date: '', timezone: '', timezone_type: 0},
    deleted_at: {date: '', timezone: '', timezone_type: 0},
  };
  message: string = '';
  errors: [] = [];

  @Mutation
  setCurrentUser(user: IUser) {
    this.currentUser = user;
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
      const userResp: AxiosResponse<IResponse<IUser>> = await http.get(apiRoutes.users.current);
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
      const loginResp: AxiosResponse<{ access_token: string, token_type: string, expires_in: number }>
        = await http.post(apiRoutes.users.login, {email, password});
      this.setAuthorized(true);
      setToken(loginResp.data.access_token);

      // Set server errors if code != 200
    } catch (e) {
      const err: IResponseError = e;
      this.setMessage(err.response.data.message);
      this.setErrors(err.response.data.errors);

      // end request
    } finally {
      this.setIsRequest(false);
    }
  }
}

export const usersStore = getModule(UsersStore);
