import axios from "axios";
import { SingletonFlowchart } from "../_service/singletonFlowchart"
import { HttpApiNode,  RequestSuscess, RequestError } from "../../../../utils/global"
import { IDbNode } from "../_interface/IDbNode";

class DbRepository {
  constructor() {
    IDbNode.DbNode.apply(this, ["Repository"]);

    this.addNode = (node) => {
      axios.post(`${HttpApiNode}`, node)
            .then(res => RequestSuscess(res.data))
            .catch(error => RequestError(error))

      SingletonFlowchart.nodeMemory.push(node);
    }
    
    this.getNodeById = (id) => {
      let data = this.getAllNodes();
      return data.filter(n => n.id == id);
    }
    
    this.updateNode = (node) => {
      axios.put(`${HttpApiNode}/${node.id}`, node)
          .then(res => RequestSuscess(res.data))
          .catch(RequestError)
    }
    
    this.removeNode = (node) => { 
      axios.delete(`${HttpApiNode}/${node.id}`)
            .then(res => RequestSuscess(res.data))
            .catch(RequestError)
    }
    
    this.getAllNodes = function () { 
      let data = JSON.parse(this.fs.readFile(this.dbFile));
      return data && data.lenght > 0 ? data : new Array();
    }
  }
}

export { DbRepository };