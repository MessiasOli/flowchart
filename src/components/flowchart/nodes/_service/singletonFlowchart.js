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
    },

    removeNodeSelected: function () {
        this.Memory.removeNode(this.selectedId)
        this.unSelectNode();
    },
}

function getId(idHtml){
    let token = idHtml.split('-');
    return token.length == 2 ? token[1] : "";
}