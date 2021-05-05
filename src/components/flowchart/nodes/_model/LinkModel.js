
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
    this.removeIn = (link) => removeLink("in", link)
    this.removeOut = (link) => removeLink("out", link)

    let removeLink = (array, link) => {
      if(array == "in"){
        this.in = this.in.filter(id => id != link.id)  
      }else{
        this.out = this.out.filter(id => id != link.id)  
      }
      link.in = link.in.filter(id => id != this.id)
    }

    let addLink = (array, link) => {
      if(!array.includes(link.id)){
        array.push(link.id)
        if(!link.in.includes(this.id))
          link.in.push(this.id)
      }
      console.log('link associado :>> ', link);
    }
  }
}