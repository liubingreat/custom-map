//事件类
class Event{

    //监听数组 存放事件处理器

    constructor() {
        this.listener = [];
    }
    //注册事件
    on(type, fn, ctx) {
        this.listener.push({
            type,
            fn,
            ctx
        });
    }

    //触发事件
    fire(type, object) {
        this.listener.filter(item => {
            return item.type === type;
        }).forEach(item => {
            let {type, fn, ctx} = item;
            ctx = ctx || this;
            fn && fn.call(ctx, object);
        });
    }
}