import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import IComponent from "../../models/IComponent";
import ITableParams, {IComponentsFilter} from "../../models/ITableParams";
import {QueryBuilder} from "../../utils/QueryBuilder";
import {AxiosResponse} from "axios";
import IResponse from "../../models/IResponse";
import {http} from "../../plugins/axios";
import {apiRoutes} from "../../apiRoutes";
import IMeta from "../../models/IMeta";

@Module({name: 'components', store: store, namespaced: true, dynamic: true})
class ComponentsStore extends VuexModule {
  component: IComponent = {article: '', cost: 0, count: 0, title: ''};
  components: IComponent[] = [];
  isRequest: boolean = false;
  meta: IMeta = {};
  message: string = '';
  errors: [] = [];
  tableParams: ITableParams<IComponentsFilter> = {
    page: 1,
    descending: false,
    filter: null,
    rowsPerPage: Number(localStorage.getItem('rowsPerPage')) || 5,
    sortBy: '',
  };

  @Mutation
  setComponents(components: IComponent[]) {
    this.components = components;
  }

  @Mutation
  setIsRequest(isRequest: boolean) {
    this.isRequest = isRequest;
  }

  @Mutation
  setTableParams(params: ITableParams<IComponentsFilter>) {
    if (params.rowsPerPage) localStorage.setItem('rowsPerPage', params.rowsPerPage.toString());
    this.tableParams = params;
  }

  @Mutation
  setMeta(meta: IMeta) {
    this.meta = meta;
  }

  @Mutation
  setMessage(message: string) {
    this.message = message;
  }

  @Mutation
  resetFilter() {
    this.tableParams = {...this.tableParams, filter: null};
  }

  @Action
  async getComponents() {
    this.setIsRequest(true);
    try {
      const queryString = (new QueryBuilder<IComponentsFilter>(this.tableParams)).build();
      const componentsRes: AxiosResponse<IResponse<IComponent[]>> = (
        await http.get(apiRoutes.components.index, {params: queryString})
      );
      this.setMeta(componentsRes.data.meta);
      this.setComponents(componentsRes.data.data);

    } catch (e) {
      this.setMessage(e.response.data.message);

    } finally {
      this.setIsRequest(false);
    }
  }
}
