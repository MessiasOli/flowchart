import { IDbNode } from "../_interface/IDbNode";

let mapIndiceAndId = new Map();
let listOfNodes = new Array();

class DbCircle {
  constructor() {
    IDbNode.DbNode.apply(this, ["DbCircle"]);
  }
}

export { DbCircle };
