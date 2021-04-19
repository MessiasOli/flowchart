import { MemoryRepository } from "./memoryRepository"
import { Save } from "./undoRedo"

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
    selectedId: null,
    clicked: null,
    copied:  new Array(),
    selectedNodes:  new Array(),
    Memory: new MemoryRepository(),
    SaveStatus: Save,

    selectNode: function(idHtml) {
        this.clicked = true
        this.selected = idHtml;
        this.selectedId = getId(idHtml)
    },

    unSelectNode: function() {
        this.clicked = false;
        this.selected = '';
        this.selectedId = '';
        this.selectedNodes = new Array();
        this.copied = new Array();
        console.log("Singleton zerado");
    },

    removeNodeSelected: function () {
        this.SaveStatus();
        if(!this.selectedNodes || this.selectedNodes.length == 0){
            console.log("Apenas um nó :", this.selectedId)
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