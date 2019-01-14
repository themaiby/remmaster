import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import IUser from "../../models/IUser";
import {http, setToken} from "../../utils/axios";
import {apiRoutes} from "../../constants";
import {AxiosResponse} from "axios";
import IResponse from "../../models/IResponse";

@Module({name: 'users', store: store, namespaced: true, dynamic: true})
class UsersStore extends VuexModule {
  authorized: boolean = false;
  message: string = '';
  errors: [] = [];
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
    this.setIsRequest(true);
    try {
      const loginResp: AxiosResponse<{ access_token: string, token_type: string, expires_in: number }>
        = await http.post(apiRoutes.users.login, {email, password});
      this.setAuthorized(true);
      setToken(loginResp.data.access_token);
    } finally {
      this.setIsRequest(false);
    }
  }
}

export const usersStore = getModule(UsersStore);
