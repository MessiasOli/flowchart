import { NodeModel } from "../_model/NodeModel";
import { DecorationOnOff } from "./decorationOnOff"
import { Types } from "../../utils/nodeTypes"
import { COLORS } from "../../utils/colors"

class OnOff extends NodeModel {
  constructor() {
    super("OnOff");
    
    this.type = new Types().OnOff;
    this.x = 200;
    this.y = 300;
    this.description = "Descrição on-off"
    this.height = 30;
    this.width = 120;
    this.switch = true
    this.switchColor = () => this.switch ? COLORS.Green : COLORS.Red
    this.xCircle = () => this.switch ? this.x + 23.5 : this.x + 1.5
    this.path = () => `M${this.x},${this.y}L${this.x + 25},${this.y}`

    this.decorate = async function(callback) {
      this.decorator = new DecorationOnOff();
      await this.decorator.init(this, callback)
    };

    this.clone = () => {
      let cloned = new OnOff();
      cloned.type = this.type
      cloned.x = this.x
      cloned.y = this.y
      cloned.height = this.height
      cloned.width = this.width
      cloned.description = this.description
      cloned.switch = this.switch

      return cloned
    }

    this.copyFrom = (node) => {
      this.simpleCopyFrom(node);
      this.description = node.description
      this.switch = node.switch
    }

    this.update = (node) => {
      this.description = node.description;
      this.decorator.update();
    }
  }
}

export { OnOff };
