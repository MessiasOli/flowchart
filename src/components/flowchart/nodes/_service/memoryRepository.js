import { IDbNode } from "../_interface/IDbNode";
import { Types } from "../../utils/nodeTypes"
class MemoryRepository {
  constructor() {
    IDbNode.DbNode.apply(this, ["Repository"]);
    this.memory = new Array();
    this.addNode = (node) => this.memory.push(node)
    this.getNodeById = (id) => this.memory.filter(n => n.id == id);
    this.getNodesToSave = () => this.memory.filter(n => n.type != new Types().Connection).map(n => n.clone())
    this.updateNode = (node) => this.memory.forEach(n => n = n.id == node.id ? node : n)
        
    this.removeNode = async (id) =>{
      this.memory = this.memory.filter(n => {
          if(n.id == id){
          n.kill();
          return false;
          }
          return true
      });
    }

    this.getNodesBetween = (c) => {
      let x1
      let x2
      let y1
      let y2;

      if(c.x1 < c.x2)
      {
        x1 = c.x1
        x2 = c.x2
      }
      else
      {
        x1 = c.x2
        x2 = c.x1
      }
        
      if(c.y1 < c.y2)
      {
        y1 = c.y1
        y2 = c.y2
      }
      else
      {
        y1 = c.y2
        y2 = c.y1
      }

      return this.memory.filter(n => {
        let xOk = n.x >= x1 && n.x <= x2
        let yOk = n.y >= y1 && n.y <= y2
        if(xOk && yOk)
          return true;
        return false;
      })
    }
    
    this.clear = async () => {
      this.memory.forEach(n => n.kill());
      this.memory = new Array();
    }

    this.getNodesNear = (x,y) => {
      let nodesNear = new Array ();
      this.memory.forEach(n => {
        nodesNear.push({ 
          near: Math.abs(n.x - x) + Math.abs(n.y - y),
          node: n
        })
      })
      nodesNear.sort((n1, n2) => {
        if(n1.near > n2.near)
          return 1;
        if(n1.near < n2.near)
          return -1;
        return 0
      })
        return nodesNear
    }
  }
}

export { MemoryRepository };