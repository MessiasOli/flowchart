import { NodeModel } from "../_model/NodeModel";
import { DecorationTokenValue } from "./decorationTokenValue"
import { Types } from "../../utils/nodeTypes"
import { Link } from "../_model/LinkModel";

class TokenValue extends NodeModel {
  constructor() {
    super("TokenValue");
    
    this.type = new Types().TokenValue;
    this.x = 500;
    this.y = 200;
    this.width = 40;
    this.yText = () => this.y + 17;
    this.link = new Link(this.id)
    this.link.value = "1.000,55";
    
    this.decorate = async function(callback) {
      this.decorator = new DecorationTokenValue();
      await this.decorator.init(this, callback)
    };

    this.updateValue = () => this.decorator.updateValue()

    this.clone = () => {
      let cloned = new TokenValue();
      cloned.id = this.id;
      cloned.idName = this.idName;
      cloned.type = this.type;
      cloned.x = this.x;
      cloned.y = this.y;
      cloned.linked = this.linked;
      cloned.link = this.link.clone()

      return cloned;
    }

    this.copyFrom = (node) => {
      this.simpleCopyFrom(node);
      this.linked = node.linked;
      this.link.copyFrom(node.link)
    }

    this.showConnected = () => {
      this.decorator.link.update(this)
    }
  }
}

export { TokenValue };
