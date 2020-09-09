class MouseHandler extends Event{
    constructor(el) {
        super();
        this.el = el;
    }

    handlerDrag() {
        let el = this.el;
        let me = this;
        el.onmousedown = function(event) {
            me.fire("movestart", event);
            el.onmousemove =  function(event1) {
                me.fire("move", event1);
                event1.preventDefault();
            }
        }

        el.onmouseup = function(event) {
            el.onmousemove =  function(event1) {
                return false;
            }
            me.fire("moveend", event);
        }
        return me;
    }

    handlerWheel() {
        let el = this.el;
        let me = this;
        el.onwheel = function(event) {
            me.fire("wheel", event);
        }
        return me;
    }
}
