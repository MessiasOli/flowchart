import { IDbNode } from "../_interface/IDbNode";

class Db_pathBase {
  constructor() {
    IDbNode.DbNode.apply(this, ["_pathBase"]);
  }

  static render() {
    let that = this;
    return new Promise(function(resolve) {});
  }
}

export { Db_pathBase };
