import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";

import {store} from "../store";
import {Vendor} from "../../models/Vendor";
import {Meta} from "../../models/Meta";
import {Filter} from "../../models/Filter";
import {TableParams} from "../../models/TableParams";
import {applicationStore} from "./ApplicationStore";
import {ISnackbarColors} from "../../models/Snackbar";
import i18n from "../../plugins/i18n";

@Module({name: 'vendors', store: store, namespaced: true, dynamic: true})
class VendorsStore extends VuexModule {

  meta: Meta = new Meta;
  vendor: Vendor = new Vendor;
  vendors: Vendor[] = [];
  tableParams = new TableParams;
  filter: Filter.Vendor = new Filter.Vendor;

  isRequest: boolean = false;
  isVendorCreatingRequest: boolean = false;
  errors: [] = [];

  @Mutation setIsRequest(isRequest: boolean) {
    this.isRequest = isRequest;
  }

  @Mutation setVendor(vendor: Vendor) {
    this.vendor = vendor;
  }

  @Mutation setVendors(vendors: Vendor[]) {
    this.vendors = vendors;
  }

  @Mutation setIsVendorCreatingRequest(isRequest: boolean) {
    this.isVendorCreatingRequest = isRequest;
  }

  @Mutation setTableParams(params: TableParams) {
    this.tableParams = this.tableParams.set(params);
  }

  @Mutation setFilter(filter: Filter.Vendor) {
    this.filter = Filter.Vendor.set(filter);
  }

  @Mutation resetFilter() {
    this.filter = new Filter.Vendor;
  }

  @Mutation setMeta(meta: Meta) {
    this.meta = meta;
  }


  @Action
  async getVendors() {
    this.setIsRequest(true);
    try {
      const vendors = await Vendor.all({...this.tableParams, ...this.filter});
      this.setMeta(vendors.meta);
      this.setVendors(vendors.data);
    } catch (e) {
      applicationStore.snackbar.call(e.response.data.message, ISnackbarColors.err);
    } finally {
      this.setIsRequest(false);
    }
  }

  @Action
  async getVendor(id: number) {
    this.setIsRequest(true);
    try {
      const vendor = await Vendor.get(id);
      this.setVendor(vendor.data);
    } catch (e) {
      applicationStore.snackbar.call(e.response.data.message, ISnackbarColors.err);
    } finally {
      this.setIsRequest(false);
    }
  }

  @Action
  async createVendor(vendor: Vendor) {
    this.setIsVendorCreatingRequest(true);
    try {
      const vendorRes = await Vendor.create(vendor);
      this.setVendor(vendorRes.data);
      const snackText = i18n.t('messages.vendors.createdSuccess', {name: this.vendor}) as string;
      applicationStore.snackbar.call(snackText, ISnackbarColors.success);
    } catch (e) {
      applicationStore.snackbar.call(e.response.data.message, ISnackbarColors.err);
    } finally {
      this.setIsVendorCreatingRequest(false);
    }
  }

  @Action
  async deleteVendor({id, name = ''}: { id: number, name: string | null }) {
    this.setIsRequest(true);
    try {
      await Vendor.delete(id);
      if (name) {
        const snackText = i18n.t('messages.vendors.deletedSuccess', {name}) as string;
        applicationStore.snackbar.call(snackText, ISnackbarColors.info);
      }
    } catch (e) {
      applicationStore.snackbar.call(e.response.data.message, ISnackbarColors.err);
    } finally {
      this.getVendors();
    }
  }

  @Action
  async updateVendor(vendor: Vendor) {
    this.setIsVendorCreatingRequest(true);
    try {
      if (vendor.id != null) {
        const vendorResp = await Vendor.update(vendor);
        this.setVendor(vendorResp.data);
        applicationStore.snackbar.call(i18n.t('messages.vendors.updatedSuccess') as string, ISnackbarColors.success);
      }
    } catch (e) {
      applicationStore.snackbar.call(e.response.data.message, ISnackbarColors.err);
    } finally {
      this.setIsVendorCreatingRequest(false);
    }
  }
}

export const vendorsStore = getModule(VendorsStore);
