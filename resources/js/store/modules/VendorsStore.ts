import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";

import Meta from "../../models/Meta";
import Vendor from "../../models/Vendor";
import TableParams from "../../models/TableParams";
import ApiResponse from "../../models/ApiResponse";

import {AxiosResponse} from "axios";

import {store} from "../store";
import {http} from "../../utils/axios";
import {api} from "../../utils/api";

// Filter fields for vendors page
interface VendorsFilter {
    name: string;
    components: [];
    createdAt: { min: string, max: string };
}

@Module({name: 'vendors', store: store, namespaced: true, dynamic: true})
class VendorsStore extends VuexModule {
    // Model sync with component
    tableParams: TableParams<VendorsFilter> = new TableParams();

    // Request status
    requestInProgress: boolean = false;

    // Vendor for show route
    vendor: Vendor = new Vendor();

    // Pagination
    meta: Meta = new Meta();

    // Vendor list for index route
    vendors: Vendor[] = [];

    // Server message
    message: string = '';

    // Server error
    errors: [] = [];

    @Mutation setRequestInProgress(isRequest: boolean) {
        this.requestInProgress = isRequest;
    }

    @Mutation setTableParams(params: TableParams<VendorsFilter>) {
        // save to storage for remember items count
        if (params.rowsPerPage) localStorage.setItem('rowsPerPage', params.rowsPerPage.toString());
        // todo: check table works
        this.tableParams = new TableParams(params);
    }

    @Mutation resetFilter() {
        this.tableParams = {...this.tableParams, filter: null};
    }

    @Mutation setVendor(vendor: Vendor) {
        this.vendor = new Vendor(vendor);
    }

    @Mutation setVendors(vendors: Vendor[]) {
        this.vendors = vendors.map(v => new Vendor(v));
    }

    @Mutation setMeta(meta: Meta) {
        this.meta = new Meta(meta);
    }

    /*   ACTIONS   */
    @Action
    async getVendors() {
        this.context.commit('setRequestInProgress', true);
        try {
            const queryString = makeQuery(this.tableParams);
            const vendors: AxiosResponse<ApiResponse<Vendor[]>> = await http.get(api.vendors.index, {params: queryString});
            this.context.commit('setMeta', vendors.data.meta);
            this.context.commit('setVendors', vendors.data.data);
        } catch (e) {
        } finally {
            this.context.commit('setRequestInProgress', false);
        }
    }
}

export const vendorsStore = getModule(VendorsStore);


// Helpers

// Generate query string vor vendors index page todo: separate
const makeQuery = (tableParams: TableParams<VendorsFilter>) => {
    let query: object = {
        perPage: tableParams.rowsPerPage,
        page: tableParams.page,
        sort: tableParams.sortBy,
        direction: tableParams.descending ? 'desc' : 'asc'
    };

    // Add filter if it present (custom for every page)
    if (tableParams.filter) query = {
        ...query,
        name: tableParams.filter.name,
        components: tableParams.filter.components,
        createdAt: [
            tableParams.filter.createdAt.min,
            tableParams.filter.createdAt.max
        ]
    };
};
