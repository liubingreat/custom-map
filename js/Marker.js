class Marker extends Layer{
    constructor(options) {
        super(options);
        this.lonlat = options.lonlat;
        this.iconUrl = options.iconUrl;
        this.iconWidth = options.iconWidth;
        this.iconHeight = options.iconHeight;
        this.offset = options.offset || [0, 0];
    }

    onAdd(map, markerLayer) {
        this.map = map;
        this.markerLayer = markerLayer;
        this.init();
    }

    init() {
        this.markerBody = document.createElement("div");
        this.markerBody.className = "map-marker";
        let img = new Image();
        img.width = this.iconWidth;
        img.height = this.iconHeight;
        img.src = this.iconUrl;
        this.markerBody.appendChild(img);
        this.markerLayer.pane.appendChild(this.markerBody);
        this.render();
    }

    render() {
        let {map, markerBody, lonlat, iconWidth, iconHeight, offset} = this;
        let pixel = map.lonlat2pixel(lonlat);
        let pos = pixel.sub(iconWidth / 2, iconHeight / 2).add(offset[0], offset[1]);
        markerBody.style.left = pos.x + "px";
        markerBody.style.top = pos.y + "px";
    }
}