import { MemoryRepository } from "./memoryRepository"

export var SingletonFlowchart = {
    instance: function(){
        if(!SingletonFlowchart.instance){
            SingletonFlowchart.instance = this;
        }
        return SingletonFlowchart.instance;
    },

    svg: null,
    nodeClicked: false,
    selected: null,
    selectedNodes: null,
    copied: null,
    clicked: null,
    Memory: new MemoryRepository(),

    selectNode: function(idHtml) {
        this.clicked = true
        this.selected = idHtml;
        this.selectedId = getId(idHtml)
    },

    unSelectNode: function() {
        this.clicked = false
        this.selected = ``
        this.selectedNodes = null
    },

    removeNodeSelected: function () {
        if(!this.selectedNodes || this.selectedNodes.length == 0){
            console.log("Apenas um nó")
            this.Memory.removeNode(this.selectedId)
            this.unSelectNode();
        }else{
            console.log("Varios nós")
            this.selectedNodes.forEach( n => {
                this.Memory.removeNode(n.id);
            })
            this.unSelectNode();
        }
    }
}

function getId(idHtml){
    let token = idHtml.split('-');
    return token.length == 2 ? token[1] : "";
}