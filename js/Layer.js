class Layer extends Event{
    constructor(options) {
        super(options);
        this.options = options;
        this.id = Utiil.createId();
        this.map = null;
    }

    onAdd(map) {
        //Overwrite
    }

    onUpdate(map) {
        //Overwrite
    }
}