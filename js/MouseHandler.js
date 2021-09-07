class MouseHandler extends Event{
    constructor(el) {
        super();
        this.el = el;
        this.lastX = void 0;
        this.lastY = void 0;
    }

    isPc() {
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
        let flag = true;
        for (let i = 0; i < Agents.length; i++) {
            if (userAgentInfo.indexOf(Agents[i]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    handlerDrag() {
        let el = this.el;
        let me = this;
        if(this.isPc()) {
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
        }else {
            el.ontouchstart = function(event) {
                let thevent = event.touches[0];
                me.lastX = thevent.pageX;
                me.lastY = thevent.pageY;
                me.fire("movestart", thevent);
                el.ontouchmove =  function(event1) {
                    let thevent1 = event1.touches[0];
                    thevent1.movementX = thevent1.pageX - me.lastX;
                    thevent1.movementY = thevent1.pageY - me.lastY;
                    me.lastX = thevent1.pageX;
                    me.lastY = thevent1.pageY;
                    me.fire("move", thevent1);
                    event1.preventDefault();
                }
            }

            el.ontouchend = function(event) {
                el.ontouchmove =  function(event1) {
                    return false;
                }
                me.lastX = void 0;
                me.lastY = void 0;
                me.fire("moveend", event);
            }
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
