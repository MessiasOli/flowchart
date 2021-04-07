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
    nodeMemory: new Array(),

    selectNode: function(id) {
        this.clicked = true
        SingletonFlowchart.selected = id
    },

    unSelectNode: function() {
        this.clicked = false
        SingletonFlowchart.selected = ``
    }
}
