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
    this.value = "1.000,55";
    this.link = new Link(this.id)
    
    this.decorate = async function(callback) {
      this.decorator = new DecorationTokenValue();
      await this.decorator.init(this, callback)
    };

    this.update = (nodeEdited) => {
      this.text = nodeEdited.text
      let lenghtOfFont = this.text.length * 7
      this.width = lenghtOfFont > this.width ? lenghtOfFont : this.width;
      this.decorator.setTextAndAdjustWidth()
    }

    this.clone = () => {
      let cloned = new TokenValue();
      cloned.id = this.id;
      cloned.idName = this.idName;
      cloned.type = this.type;
      cloned.x = this.x;
      cloned.y = this.y;
      cloned.value = this.value;
      cloned.linked = this.linked;
      cloned.link = this.link.clone()

      return cloned;
    }

    this.copyFrom = (node) => {
      this.simpleCopyFrom(node);
      this.value = node.value;
      this.linked = node.linked;
      this.link.copyFrom(node.link)
    }

    this.showConnected = (resultConn) => {
      this.linked.in = resultConn.in
      this.linked.out = resultConn.out
      this.decorator.link.update(this)
    }

    this.showConnected = (resultConn) => {
      console.log('resultConn :>> ', resultConn);
      this.linked.out = resultConn.out
      this.linked.id = resultConn.id
      this.decorator.link.update(this)
    }
  }
}

export { TokenValue };
