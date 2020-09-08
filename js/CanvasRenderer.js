class CanvasRenderer extends Layer{
    constructor() {
        super();
        this.canvas = document.createElement("canvas");
    }

    onAdd(map) {
        this.map = map;
        let {size} = this.map;
        this.canvas.style = {
            width: `${size.x + size.x / 10 * 2}px`,
            height: `${size.y + size.y / 10 * 2}px`,
            transform: `translate(${-size.x / 10}px, ${-size.y / 10}px)`
        };
        this.canvas.width = size.x * 2 + size.x / 10 * 4;
        this.canvas.height = size.y * 2 + size.y / 10 * 4;
        this.map.mapRenderPane.appendChild(this.canvas);
    }

    onUpdate(map) {

    }
}