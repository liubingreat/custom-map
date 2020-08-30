class MarkerLayer extends Layer{
    constructor(options) {
        options = Object.assign({zIndex: 100}, options);
        super(options);
        this.type = "markerLayer";
        let pane = this.pane = document.createElement("div");
        pane.className = "map-marker-pane";
        pane.style["z-index"] = this.options.zIndex;
        this.markers = options.markers.map(m => {
            return new Marker(m);
        }) || [];

    }

    onAdd(map) {
        this.map = map;
        map.mapPane.appendChild(this.pane);
        if(Array.isArray(this.markers)) {
            this.markers.forEach(m => {
                m.onAdd(map, this);
            });
        }
    }
}