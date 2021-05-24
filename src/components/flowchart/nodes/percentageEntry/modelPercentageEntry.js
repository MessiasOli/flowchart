import { NodeModel } from "../_model/NodeModel";
import { DecorationPercentageEntry } from "./decorationPercentageEntry"
import { Types } from "../../utils/nodeTypes"
import { NumberFormat } from "../../utils/tools"
import { Link } from "../_model/LinkModel";

class PercentageEntry extends NodeModel {
  constructor() {
    super("PercentageEntry");
    
    this.type = new Types().PercentageEntry
    this.value = "0,00";
    this.x = 500;
    this.xText = () => this.x + (this.width / 2)
    this.y = 100;
    this.height = 20;
    this.heightText = this.height - 5;
    this.width = 70;
    this.link = new Link(this.id)
    
    this.decorate = async function(callback) {
      this.decorator = new DecorationPercentageEntry();
      await this.decorator.init(this, callback)
    };

    this.update = (nodeEdited) => {
      if(!nodeEdited) nodeEdited = this
      console.log('nodeEdited :>> ', nodeEdited.nodesConnected);

      this.value = NumberFormat(nodeEdited.value)
      let lenghtOfFont = this.value.length * 9
      this.width = lenghtOfFont > this.width ? lenghtOfFont : this.width;
      this.decorator.setTextAndAdjustWidth()
      
      if(nodeEdited.nodesConnected){
        nodeEdited.nodesConnected.forEach(link => this.link.addOut(link))
        this.decorator.updateConnection(nodeEdited.nodesConnected)
        delete nodeEdited.nodesConnected
      }

      if(nodeEdited.nodesDesconnected){
        nodeEdited.nodesDesconnected.forEach(link => this.link.removeOut(link))
        this.decorator.updateConnection(nodeEdited.nodesDesconnected)
        delete nodeEdited.nodesDesconnected
      }
      console.log("Atualizando nó", this)
    }

    this.clone = function() {
      let cloned = new PercentageEntry();
      cloned.id = this.id;
      cloned.idName = this.idName
      cloned.type = this.type
      cloned.value = this.value;
      cloned.x = this.x;
      cloned.y = this.y;
      cloned.link = this.link.clone()

      return cloned;
    }

    this.copyFrom = (node) =>{
      this.simpleCopyFrom(node)
      this.value = node.value
      this.heightText = node.heightText
      this.link.copyFrom(node.link)
    }

    this.showConnected = () => {
      console.log('this.decorator.link :>> ', this.decorator.link);
      this.decorator.link.update()
    }
  }
}


export { PercentageEntry };
