import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {store} from "../store";
import {Order} from "../../models/Order";
import {Validator} from "vee-validate";

export interface IOrderCreateValidator {
  client?: Validator;
  device?: Validator;
  order?: Validator;
  works?: Validator;
  components?: Validator;
}

@Module({name: 'models', store: store, namespaced: true, dynamic: true})
class ModelsStore extends VuexModule {
  orderModel: Order = new Order();
  stepper: number = 1;

  @Mutation setOrder(order: Order) {
    this.orderModel = order;
  }

  @Mutation setStepper(step: number) {
    this.stepper = step;
  }
}

export const modelsStore = getModule(ModelsStore);
