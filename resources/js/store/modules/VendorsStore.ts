import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {QueryBuilder} from "../../utils/QueryBuilder";

import {store} from "../store";
import {http} from "../../plugins/axios";
import {apiRoutes} from "../../apiRoutes";
/* Interfaces */
import {AxiosResponse} from "axios";
import IMeta from "../../models/IMeta";
import IResponse from "../../models/IResponse";
import ITableParams, {IVendorsFilter} from "../../models/ITableParams";
import IVendor from "../../models/IVendor";

@Module({name: 'vendors', store: store, namespaced: true, dynamic: true})
class VendorsStore extends VuexModule {
  meta: IMeta = {};
  isRequest: boolean = false;
  isVendorCreatingRequest: boolean = false;
  vendors: IVendor[] = [];
  message: string = '';
  errors: [] = [];
  vendor: IVendor = {
    id: 0,
    name: '',
    components_count: 0,
    components_cost: 0,
    note: '',
    components: [],
    contacts: [],
    created_at: {date: '', timezone_type: 0, timezone: ''},
    updated_at: {date: '', timezone_type: 0, timezone: ''},
    deleted_at: {date: '', timezone_type: 0, timezone: ''}
  };
  tableParams: ITableParams<IVendorsFilter> = {
    page: 1,
    descending: false,
    filter: null,
    rowsPerPage: Number(localStorage.getItem('vendorsPerPage')) || 5,
    sortBy: '',
  };

  @Mutation
  setIsRequest(isRequest: boolean) {
    this.isRequest = isRequest;
  }

  @Mutation
  setIsVendorCreatingRequest(isRequest: boolean) {
    this.isVendorCreatingRequest = isRequest;
  }

  @Mutation
  setTableParams(params: ITableParams<IVendorsFilter>) {
    if (params.rowsPerPage) localStorage.setItem('vendorsPerPage', params.rowsPerPage.toString());
    this.tableParams = params;
  }

  @Mutation
  resetFilter() {
    this.tableParams = {...this.tableParams, filter: null};
  }

  @Mutation
  setVendor(vendor: IVendor) {
    this.vendor = vendor;
  }

  @Mutation
  setVendors(vendors: IVendor[]) {
    this.vendors = vendors;
  }

  @Mutation
  setMeta(meta: IMeta) {
    this.meta = meta;
  }

  @Mutation
  setMessage(message: string) {
    this.message = message;
  }

  /* GETTERS */
  get getVendorById() {
    return (id: number) => this.vendors.find(vendor => vendor.id === id);
  }

  /*   ACTIONS   */
  @Action
  async getVendors() {
    this.setIsRequest(true);
    try {
      const queryString = (new QueryBuilder<IVendorsFilter>(this.tableParams)).build();
      const vendors: AxiosResponse<IResponse<IVendor[]>> = (
        await http.get(apiRoutes.vendors.index, {params: queryString})
      );
      this.context.commit('setMeta', vendors.data.meta);
      this.context.commit('setVendors', vendors.data.data);

    } catch (e) {
      this.setMessage(e.response.data.message);
    } finally {
      this.setIsRequest(false);
    }
  }

  @Action
  async getVendor(id: number) {
    this.setIsRequest(true);
    try {
      const vendorResponse: AxiosResponse<IResponse<IVendor>> = await http.get(apiRoutes.vendors.show(id));
      this.setVendor(vendorResponse.data.data);
    } catch (e) {
      this.setMessage(e.response.data.message);
    } finally {
      this.setIsRequest(false);
    }
  }

  @Action
  async createVendor(vendor: IVendor) {
    this.setIsVendorCreatingRequest(true);
    try {
      const vendorResp: AxiosResponse<IResponse<IVendor>> = await http.post(apiRoutes.vendors.create, {
        ...vendor, contacts: vendor.contacts ? vendor.contacts : []
      });
      this.setVendor(vendorResp.data.data);
    } catch (e) {
      this.setMessage(e.response.data.message);
    } finally {
      this.setIsVendorCreatingRequest(false);
    }
  }

  @Action
  async deleteVendor(id: number) {
    this.setIsRequest(true);
    try {
      const response: AxiosResponse<IResponse<{}>> = await http.delete(apiRoutes.vendors.delete(id));

    } catch (e) {
      this.setMessage(e.response.data.message);

    } finally {
      this.getVendors();
    }
  }

  @Action
  async updateVendor(vendor: IVendor) {
    this.setIsVendorCreatingRequest(true);
    try {
      if (vendor.id != null) {
        const vendorResp: AxiosResponse<IResponse<IVendor>> = await http.put(apiRoutes.vendors.update(vendor.id), {
          ...vendor, contacts: vendor.contacts ? vendor.contacts : []
        });
        this.setVendor(vendorResp.data.data);
      }
    } catch (e) {
      this.setMessage(e.response.data.message);
    } finally {
      this.setIsVendorCreatingRequest(false);
    }
  }
}

export const vendorsStore = getModule(VendorsStore);
