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
    
    this.getAllNodes = () => this.memory.map(n => n.clone())
    
    this.clear = () => this.memory = new Array();
  }
}

export { MemoryRepository };