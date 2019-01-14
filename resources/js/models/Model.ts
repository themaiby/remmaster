export default class Model {
  // Overwrites by constructor
  [key: string]: any;

  /**
   * Map params to model
   * Assign only params which defined in inherited Model
   * @param data
   */
  constructor(data?: any) {
    for (let key in data) {
      // Data checking too for prevent "Possible Iteration Over Unexpected"
      if (data.hasOwnProperty(key) && this.constructor.prototype.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  }
}
