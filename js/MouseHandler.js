class MouseHandler {
    constructor(map) {
        this.map = map;
    }

    handlerDrag() {
        let {container} = this.map;
        let me = this;
        container.onmousedown = function(event) {
            me.map.movestart(event);
            container.onmousemove =  function(event1) {
                me.map.move(event1);
                event1.preventDefault();
            }
        }

        container.onmouseup = function(event) {
            container.onmousemove =  function(event1) {
                return false;
            }
            me.map.moveend(event);
        }


    }

    handlerMove(event) {
        event.preventDefault();
    }

}
