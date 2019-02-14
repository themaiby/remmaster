import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import {Order} from "../../models/Order";
import {TableParams} from "../../models/TableParams";
import {Meta} from "../../models/Meta";
import {Filter} from "../../models/Filter";
import {applicationStore} from "./ApplicationStore";
import {ISnackbarColors} from "../../models/Snackbar";
import {OrderStatus} from "../../models/OrderStatus";

@Module({name: 'orders', store: store, namespaced: true, dynamic: true})
class OrdersStore extends VuexModule {

  orders: Order[] = [];
  order: Order = new Order();
  tableParams: TableParams = new TableParams();
  meta: Meta = new Meta;
  filter: Filter.Order = new Filter.Order();
  statuses: OrderStatus[] = [];

  isRequest: boolean = false;
  errors: [] = [];

  @Mutation setOrders(orders: Order[]) {
    this.orders = orders;
  }

  @Mutation setOrder(order: Order) {
    this.order = order;
  }

  @Mutation setMeta(meta: Meta) {
    this.meta = meta;
  }

  @Mutation setTableParams(params: TableParams) {
    this.tableParams = this.tableParams.set(params);
  }

  @Mutation setIsRequest(isRequest: boolean) {
    this.isRequest = isRequest;
  }

  @Mutation setFilter(filter: Filter.Order) {
    this.filter = Filter.Order.set(filter);
  }

  @Mutation resetFilter() {
    this.filter = new Filter.Order;
  }

  @Mutation setStatuses(statuses: OrderStatus[]) {
    this.statuses = statuses;
  }

  @Action
  async getOrders() {
    this.setIsRequest(true);
    try {
      const orders = await Order.all({...this.tableParams, ...this.filter});
      this.setMeta(orders.meta);
      this.setOrders(orders.data);
    } catch (e) {
      applicationStore.snackbar.call(e.response.data.message, ISnackbarColors.err);
    } finally {
      this.setIsRequest(false);
    }
  }

  @Action
  async getOrder(id: number) {
    this.setIsRequest(true);
    try {
      const order = await Order.get(id);
      this.setOrder(order.data);
    } catch (e) {
      applicationStore.snackbar.call(e.response.data.message, ISnackbarColors.err);
    } finally {
      this.setIsRequest(false);
    }
  }

  @Action
  async getStatuses() {
    this.setIsRequest(true);
    try {
      const statuses = await OrderStatus.all();
      this.setStatuses(statuses.data);
    } catch (e) {
      applicationStore.snackbar.call(e.response.data.message, ISnackbarColors.err);
    } finally {
      this.setIsRequest(false);
    }
  }
}

export const ordersStore = getModule(OrdersStore);
