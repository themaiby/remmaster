import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {QueryBuilder} from "../../utils/QueryBuilder";

import {store} from "../store";
import {http} from "../../plugins/axios";
import {apiRoutes} from "../../apiRoutes";
/* Interfaces */
import {AxiosResponse} from "axios";
import IMeta from "../../interfaces/IMeta";
import IResponse from "../../interfaces/IResponse";
import ITableParams, {IVendorsFilter} from "../../interfaces/ITableParams";
import {snack} from "../../utils/snack";
import {createVendorModel, defaultVendorModel, Vendor, VendorCollection, VendorScheme} from "../../models/Vendor";

@Module({name: 'vendors', store: store, namespaced: true, dynamic: true})
class VendorsStore extends VuexModule {
  meta: IMeta = {};
  vendor: Vendor = createVendorModel(defaultVendorModel);
  vendors: VendorCollection = [];

  isRequest: boolean = false;
  isVendorCreatingRequest: boolean = false;
  message: string = '';
  errors: [] = [];
  tableParams: ITableParams<IVendorsFilter> = {
    page: 1,
    descending: false,
    filter: null,
    rowsPerPage: Number(localStorage.getItem('vendorsPerPage')) || 5,
    sortBy: '',
  };

  /* GETTERS */
  get getVendorById() {
    return (id: number) => this.vendors.find(vendor => vendor.id === id);
  }

  @Mutation setIsRequest(isRequest: boolean) {
    this.isRequest = isRequest;
  }

  @Mutation setVendor(vendor: VendorScheme) {
    this.vendor = createVendorModel(vendor);
  }

  @Mutation setVendors(vendors: VendorCollection) {
    this.vendors = vendors.map((vendor => createVendorModel(vendor)));
  }

  @Mutation setIsVendorCreatingRequest(isRequest: boolean) {
    this.isVendorCreatingRequest = isRequest;
  }

  @Mutation setTableParams(params: ITableParams<IVendorsFilter>) {
    if (params.rowsPerPage) localStorage.setItem('vendorsPerPage', params.rowsPerPage.toString());
    this.tableParams = params;
  }

  @Mutation
  resetFilter() {
    this.tableParams = {...this.tableParams, filter: null};
  }

  @Mutation
  setMeta(meta: IMeta) {
    this.meta = meta;
  }

  @Mutation
  setMessage(message: string) {
    this.message = message;
  }

  /*   ACTIONS   */
  @Action
  async getVendors() {
    this.setIsRequest(true);
    try {
      const queryString = (new QueryBuilder<IVendorsFilter>(this.tableParams)).build();
      const vendors: AxiosResponse<IResponse<VendorScheme[]>> = (
        await http.get(apiRoutes.vendors.index, {params: queryString})
      );
      this.setMeta(vendors.data.meta);
      this.setVendors(vendors.data.data);
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
      const vendorResponse: AxiosResponse<IResponse<VendorScheme>> = await http.get(apiRoutes.vendors.show(id));
      this.setVendor(vendorResponse.data.data);
    } catch (e) {
      this.setMessage(e.response.data.message);
    } finally {
      this.setIsRequest(false);
    }
  }

  @Action
  async createVendor(vendor: VendorScheme) {
    this.setIsVendorCreatingRequest(true);
    try {
      const vendorResp: AxiosResponse<IResponse<VendorScheme>> = await http.post(apiRoutes.vendors.create, {
        ...vendor, contacts: vendor.contacts ? vendor.contacts : []
      });
      this.setVendor(vendorResp.data.data);
      snack.success('messages.vendors.createdSuccess', {name: this.vendor.name});
    } catch (e) {
      snack.err(e.response.data.message);
    } finally {
      this.setIsVendorCreatingRequest(false);
    }
  }

  @Action
  async deleteVendor({id, name = ''}: { id: number, name: string | null }) {
    this.setIsRequest(true);
    try {
      await http.delete(apiRoutes.vendors.delete(id));
      if (name) snack.info('messages.vendors.deletedSuccess', {name: name});
    } catch (e) {
      snack.err(e.response.data.message);
    } finally {
      this.getVendors();
    }
  }

  @Action
  async updateVendor(vendor: VendorScheme) {
    this.setIsVendorCreatingRequest(true);
    try {
      if (vendor.id != null) {
        const vendorResp: AxiosResponse<IResponse<VendorScheme>> = await http.put(apiRoutes.vendors.update(vendor.id),
          {
            ...vendor,
            contacts: vendor.contacts ? vendor.contacts : []
          });
        this.setVendor(vendorResp.data.data);
        snack.success('messages.vendors.updatedSuccess');
      }
    } catch (e) {
      snack.err(e.response.data.message);
    } finally {
      this.setIsVendorCreatingRequest(false);
    }
  }
}

export const vendorsStore = getModule(VendorsStore);
