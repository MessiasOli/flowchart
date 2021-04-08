import { INode } from "../_interface/INode";

export class NodeModel extends INode {
  constructor(nameClass) {
    super(nameClass)
    this.id = + new Date();
    this.x = 660;
    this.y = 20;
    this.heigth = 20;
    this.width = 120;
    this.decorate = null;

    this.simpleCopyFrom = (node) => {
      this.id = node.id;
      this.type = node.type;
      this.x = node.x;
      this.y = node.y;
      this.heigth = node.heigth;
      this.width = node.width;
    }
  }
}
