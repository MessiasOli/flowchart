import { IDbNode } from "../_interface/IDbNode";

class DbPercentageEntry {
  constructor() {
    IDbNode.DbNode.apply(this, ["PercentageEntry"]);
  }

  static render() {
    let that = this;
    return new Promise(function(resolve) {});
  }
}

export { DbPercentageEntry };
