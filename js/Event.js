//�¼���
class Event{
    //�������� ����¼�������
    constructor() {
        this.listener = [];
    }
    //ע���¼�
    on(type, fn, ctx) {
        this.listener.push({
            type,
            fn,
            ctx
        });
    }

    //�����¼�
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