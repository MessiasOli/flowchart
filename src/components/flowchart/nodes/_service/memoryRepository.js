import { IDbNode } from "../_interface/IDbNode";
class MemoryRepository {
  constructor() {
    IDbNode.DbNode.apply(this, ["Repository"]);
    this.memory = new Array();

    this.addNode = (node) => this.memory.push(node)
    
    this.getNodeById = (id) => this.memory.filter(n => n.id == id);
    
    this.updateNode = (node) => this.memory.forEach(n => n = n.id == node.id ? node : n)
    
    this.removeNode = (id) =>{
     this.memory = this.memory.filter(n => n.id != id);
    }
    
    this.getNodesToSave = () => this.memory.map(n => n.clone())

    this.getNodesBetween = (c) => {
      let x1
      let x2
      let y1
      let y2;

      if(c.x1 < c.x2){
        x1 = c.x1
        x2 = c.x2
      }
      else{
        x1 = c.x2
        x2 = c.x1
      }
        
      if(c.y1 < c.y2){
        y1 = c.y1
        y2 = c.y2
      }
      else{
        y1 = c.y2
        y2 = c.y1
      }

      return this.memory.filter(n => {

        let xOk = n.x >= x1 && n.x <= x2
        let yOk = n.y >= y1 && n.y <= y2
        // console.log('node :>> ', n);
        // console.log('x1, x2, y1,y2 :>> ', x1, x2, y1,y2);
        // console.log('xOk, yOk :>> ', xOk, yOk);

        if(xOk && yOk)
          return true;
        return false;
      })
    }
    
    this.clear = () => this.memory = new Array();
  }
}

export { MemoryRepository };