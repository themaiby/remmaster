import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";

import {store} from "../store";
import {snack} from "../../utils/snack";
import {Vendor} from "../../models/Vendor";
import {createMetaModel, Meta, MetaScheme} from "../../models/Meta";
import {Filter} from "../../models/Filter";
import {TableParams} from "../../models/TableParams";

@Module({name: 'vendors', store: store, namespaced: true, dynamic: true})
class VendorsStore extends VuexModule {

  meta: Meta = new Meta;
  vendor: Vendor = new Vendor;
  vendors: Vendor[] = [];
  tableParams = new TableParams;
  filter: Filter.Vendor | null = null;

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
    this.tableParams = new TableParams(params);
  }

  @Mutation setFilter(filter: Filter.Vendor) {
    this.filter = new Filter.Vendor(filter);
  }

  @Mutation resetFilter() {
    this.filter = null;
  }

  @Mutation setMeta(meta: MetaScheme) {
    this.meta = createMetaModel(meta);
  }


  @Action
  async getVendors() {
    this.setIsRequest(true);
    try {
      console.log(this.filter);
      const vendors = await Vendor.all({...this.tableParams, ...this.filter});
      this.setMeta(vendors.meta);
      this.setVendors(vendors.data);
    } catch (e) {
      snack.err(e.response.data.message);
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
      snack.err(e.response.data.message);
    } finally {
      this.setIsRequest(false);
    }
  }

  @Action
  async createVendor(vendor: Vendor) {
    this.setIsVendorCreatingRequest(true);
    try {
      const vendorRes = await Vendor.create({...vendor, contacts: vendor.contacts ? vendor.contacts : []});
      this.setVendor(vendorRes.data);
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
      await Vendor.delete(id);
      if (name) snack.info('messages.vendors.deletedSuccess', {name: name});
    } catch (e) {
      snack.err(e.response.data.message);
    } finally {
      this.getVendors();
    }
  }

  @Action
  async updateVendor(vendor: Vendor) {
    this.setIsVendorCreatingRequest(true);
    try {
      if (vendor.id != null) {
        const vendorResp = await Vendor.update({...vendor, contacts: vendor.contacts ? vendor.contacts : []});
        this.setVendor(vendorResp.data);
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
