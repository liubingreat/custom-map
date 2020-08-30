class Layer{
    constructor(options) {
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