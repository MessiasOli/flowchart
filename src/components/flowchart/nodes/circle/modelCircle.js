import { INode } from "../_interface/INode";
import { NodeModel } from "../_model/_NodeModel";
import { DecorationCircle } from "./decorationCircle"

class Circle {
  constructor() {
    NodeModel.call(this);
    INode.Node.apply(this, ["Circle"]);

    this.decorate = async function() {
      await DecorationCircle.init(this)
    };
  }
}

Circle.prototype = Object.create(NodeModel.prototype);

export { Circle };
