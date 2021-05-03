
export class Link{
  constructor(id){
    this.id = id;
    this.quota = 1;
    this.value = "0,00";
    this.in = [];
    this.out = [];

    this.copyFrom = (link) => {
      this.id = link.id;
      this.quota = link.quota;
      this.value = link.value;
      this.in = link.in;
      this.out = link.out;
    }

    this.clone = () => {
      let cloned = new Link(this.id)
      cloned.quota = this.quota
      cloned.value = this.value
      cloned.in = this.in;
      cloned.out = this.out;
      
      return cloned
    }

    this.addIn = (link) => addLink(this.in, link)
    this.addOut = (link) => addLink(this.out, link)
    this.removeIn = (link) => {this.in = this.in.filter(id => id != link.id)}
    this.removeOut = (link) => {this.out = this.out.filter(id => id != link.id)}

    let addLink = (array, link) => {
      if(!array.includes(link.id)){
        array.push(link.id)
        link.in.push(this.id)
      }
    }
  }
}