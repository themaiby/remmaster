import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import {snack} from "../../utils/snack";
import {Component} from "../../models/Component";
import {ComponentCategory} from "../../models/ComponentCategory";
import {Meta} from "../../models/Meta";
import {Vendor} from "../../models/Vendor";
import {TableParams} from "../../models/TableParams";
import {Filter} from "../../models/Filter";

@Module({name: 'components', store: store, namespaced: true, dynamic: true})
class ComponentsStore extends VuexModule {
  component: Component = new Component();
  components: Component[] = [];
  tableParams: TableParams = new TableParams();
  meta: Meta = new Meta();
  availableVendors: Vendor[] = [];
  availableCategories: ComponentCategory[] = [];
  filter: Filter.Component | null = null;

  isRequest: boolean = false;
  isUpdateRequest: boolean = false;
  isFilterLoading: boolean = false;
  message: string = '';
  errors: [] = [];
  isComponentCreatingRequest: boolean = false;

  get getComponentById() {
    return (id: number) => this.components.find(c => c.id === id); /* todo: move to component*/
  }

  @Mutation setIsComponentCreatingRequest(isRequest: boolean) {
    this.isComponentCreatingRequest = isRequest;
  }

  @Mutation setComponents(components: Component[]) {
    this.components = components;
  }

  @Mutation setIsRequest(isRequest: boolean) {
    this.isRequest = isRequest;
  }

  @Mutation setIsUpdateRequest(isRequest: boolean) {
    this.isRequest = isRequest;
  }

  @Mutation setTableParams(params: TableParams) {
    this.tableParams = params;
  }

  @Mutation setMeta(meta: Meta) {
    this.meta = meta;
  }

  @Mutation setMessage(message: string) {
    this.message = message;
  }

  @Mutation setFilter(filter: Filter.Component) {
    this.filter = filter;
  }

  @Mutation resetFilter() {
    this.filter = null;
  }

  @Mutation setFilterLoading(isLoading: boolean) {
    this.isFilterLoading = isLoading;
  }

  @Mutation setAvailableVendors(vendors: Vendor[]) {
    this.availableVendors = vendors;
  }

  @Mutation setAvailableCategories(categories: { id: number, title: string }[]) {
    this.availableCategories = categories;
  }

  @Mutation setComponent(component: Component) {
    this.component = component;
  }

  @Action
  async getComponents() {
    this.setIsRequest(true);
    try {
      const components = await Component.all({...this.tableParams, ...this.filter});
      this.setMeta(components.meta);
      this.setComponents(components.data);
    } catch (e) {
      snack.err(e.response.data.message);
    } finally {
      this.setIsRequest(false);
    }
  }

  @Action
  async getAvailableVendors() {
    this.setFilterLoading(true);
    try {
      const availableVendors = await Vendor.getAvailable();
      this.setAvailableVendors(availableVendors.data);
    } catch (e) {
      snack.err(e.response.data.message);
    } finally {
      this.setFilterLoading(false);
    }
  }

  @Action
  async getAvailableCategories() {
    this.setFilterLoading(true);
    try {
      const categories = await ComponentCategory.getAvailable();
      this.setAvailableCategories(categories.data);
    } finally {
      this.setFilterLoading(false);
    }
  }

  @Action
  async createComponent(component: Component) {
    this.setIsComponentCreatingRequest(true);
    try {
      const storedComponent = await Component.create(component);

      this.setComponent(storedComponent.data);

      snack.success('messages.components.createdSuccess', {
        title: this.component.title, article: this.component.article
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
      const component = await Component.get(id);
      this.setComponent(component.data);
    } catch (e) {
      snack.err(e.response.data.message);
    } finally {
      this.setIsRequest(false);
    }
  }

  @Action
  async updateComponent(component: Component) {
    this.setIsUpdateRequest(true);
    try {
      if (component.id != null) {
        const updatedComponent = await Component.update(component);
        this.setComponent(updatedComponent.data);
        snack.success('messages.components.updatedSuccess');
      }
    } catch (e) {
      snack.err(e.response.data.message);
    } finally {
      this.setIsUpdateRequest(false);
    }
  }

  @Action
  async deleteComponent({id, title = ''}: { id: number, title: string | null }) {
    this.setIsRequest(true);
    try {
      await Component.delete(id);
      if (title) snack.info('messages.components.deletedSuccess', {title});
    } catch (e) {
      snack.err(e.response.data.message);
    } finally {
      this.getComponents();
    }
  }
}

export const componentsStore = getModule(ComponentsStore);
