import {getModule, Module, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import Meta from "../../models/Meta";
import Vendor from "../../models/Vendor";
import TableParams from "../../models/TableParams";


@Module({name: 'vendors', store: store, namespaced: true, dynamic: true})
class VendorsStore extends VuexModule {
    tableParams: TableParams = new TableParams();
    vendor: Vendor = new Vendor();
    meta: Meta = new Meta();
    vendors: Vendor[] = [];
    message: string = '';
    errors: [] = [];
}

export const vendorsStore = getModule(VendorsStore);
