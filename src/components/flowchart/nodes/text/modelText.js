import { NodeModel } from "../_model/NodeModel";
import { DecorationText } from "./decorationText"
import { Types } from "../../utils/nodeTypes"

class Text extends NodeModel {
  constructor() {
    super("Text");
    
    this.type = new Types().Text;
    this.x = 500;
    this.y = 200;
    this.width = 40;
    this.yText = () => this.y + 17;
    this.text = "Texto";
    
    this.decorate = async function(callback) {
      this.decorator = new DecorationText();
      await this.decorator.init(this, callback)
    };

    this.update = (nodeEdited) => {
      console.log('nodeEdited :>> ', nodeEdited);
      this.text = nodeEdited.text
      let lenghtOfFont = this.text.length * 7
      this.width = lenghtOfFont > this.width ? lenghtOfFont : this.width;
      this.decorator.setTextAndAdjustWidth()
    }

    this.clone = () => {
      console.log('clone :>> ');
      let cloned = new Text();
      cloned.id = this.id;
      cloned.idName = this.idName;
      cloned.type = this.type;
      cloned.x = this.x;
      cloned.y = this.y;
      cloned.text = this.text;

      return cloned;
    }

    this.copyFrom = (node) => {
      this.simpleCopyFrom(node);
      this.text = node.text;
    }
  }
}

export { Text };
