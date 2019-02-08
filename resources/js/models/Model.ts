import {AxiosResponse} from "axios";
import {Response as ResponseModel, ResponseScheme} from "./Response";
import {http} from "../plugins/axios";

type ResponseClass = { new<T>(args: {} | [], classToMap: ResponseClass): any; };
const createClass = <T extends Model>(c: { new(): T }) => new c();

abstract class Model {
  /**
   * Default paths for every request
   */
  abstract path = {
    all: () => {
      throw Error('Path "all" not defined. Set it in your model');
    }
  };

  /**
   * Get all entities
   * @param query
   * @param CustomResponseClass
   */
  static async all<T extends Model>(
    /* creates new class type instance from child */
    this: { new(): T },
    /* GET query data */
    query?: {},
    /* uses for replacing ResponseModel to Custom class */
    CustomResponseClass?: ResponseClass
  ): Promise<ResponseModel<T[]> | ResponseClass> {
    /**
     * Create new class instance from child for using itself vars in static class
     */
    const self = createClass(this);

    /**
     * Make typed request
     * Type depends on caller class type
     */
    const v: AxiosResponse<ResponseScheme<T[]>> = await http.get(self.path.all(), {params: query});

    /**
     * uses in case when do not need map on default response
     */
    if (CustomResponseClass) return new CustomResponseClass<T[]>(v.data, this);

    /**
     * Mapped response with child
     */
    return new ResponseModel<T[]>(v.data, this);
  }
}
