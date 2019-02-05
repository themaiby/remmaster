import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import IComponent from "../../models/IComponent";
import ITableParams, {IComponentsFilter} from "../../models/ITableParams";
import {QueryBuilder} from "../../utils/QueryBuilder";
import {AxiosResponse} from "axios";
import IResponse from "../../models/IResponse";
import {http} from "../../plugins/axios";
import {apiRoutes} from "../../apiRoutes";
import IMeta from "../../models/IMeta";
import IVendor from "../../models/IVendor";
import {snack} from "../../utils/snack";

@Module({name: 'components', store: store, namespaced: true, dynamic: true})
class ComponentsStore extends VuexModule {
  component: IComponent = {article: '', cost: 0, count: 0, title: ''};
  components: IComponent[] = [];
  isRequest: boolean = false;
  isFilterLoading: boolean = false;
  meta: IMeta = {};
  message: string = '';
  errors: [] = [];
  tableParams: ITableParams<IComponentsFilter> = {
    page: 1,
    descending: false,
    filter: null,
    rowsPerPage: Number(localStorage.getItem('componentsPerPage')) || 5,
    sortBy: '',
  };
  availableVendors: IVendor[] = [];
  availableCategories: { id: number, title: string }[] = [];
  isComponentCreatingRequest: boolean = false;

  @Mutation
  setIsComponentCreatingRequest(isRequest: boolean) {
    this.isComponentCreatingRequest = isRequest;
  }

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
    if (params.rowsPerPage) localStorage.setItem('componentsPerPage', params.rowsPerPage.toString());
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

  @Mutation
  setFilterLoading(isLoading: boolean) {
    this.isFilterLoading = isLoading;
  }

  @Mutation
  setAvailableVendors(vendors: IVendor[]) {
    this.availableVendors = vendors;
  }

  @Mutation
  setAvailableCategories(categories: { id: number, title: string }[]) {
    this.availableCategories = categories;
  }

  @Mutation
  setComponent(component: IComponent) {
    this.component = component;
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

  @Action
  async getAvailableVendors() {
    this.setFilterLoading(true);
    try {
      const vendorsRes: AxiosResponse<IResponse<IVendor[]>> = await http.get(apiRoutes.components.availableVendors);
      this.setAvailableVendors(vendorsRes.data.data);
    } finally {
      this.setFilterLoading(false);
    }
  }

  @Action
  async getAvailableCategories() {
    this.setFilterLoading(true);
    try {
      const categoriesRes: AxiosResponse<IResponse<{ id: number, title: string }[]>>
        = await http.get(apiRoutes.components.availableCategories);
      this.setAvailableCategories(categoriesRes.data.data);
    } finally {
      this.setFilterLoading(false);
    }
  }

  @Action
  async createComponent(component: IComponent) {
    this.setIsComponentCreatingRequest(true);
    try {
      const componentRes: AxiosResponse<IResponse<IComponent>> = await http.post(apiRoutes.components.create, component);
      this.setComponent(componentRes.data.data);
      snack.success('messages.components.createdSuccess', {
        title: this.component.title,
        article: this.component.article
      });
    } catch (e) {
      snack.err(e.response.data.message);
    } finally {
      this.setIsComponentCreatingRequest(false);
    }
  }

  @Action
  async getComponent(id: number) {
    this.setIsRequest(true);
    try {
      const componentRes: AxiosResponse<IResponse<IComponent>> = await http.post(apiRoutes.components.show(id));
      this.setComponent(componentRes.data.data);
    } catch (e) {
      snack.err(e.response.data.message);
    } finally {
      this.setIsRequest(false);
    }
  }
}

export const componentsStore = getModule(ComponentsStore);
