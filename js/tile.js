class Tile extends Layer{
    constructor(options) {
        super(options);
        options = Object.assign({tileSize: 256, dpi: 96}, options);
        this.tileSize = options.tileSize;
        this.dpi = options.dpi;
        this.origin = new Point(-20037508.342789244, 20037508.342789244);
        this.url = options.url;
    }

    onAdd(map) {
        this.map = map;
        this.tiles = [];
        this.render();
        this.map.on("move", this.onUpdate, this);
        this.map.on("zoomend", this.onZoomEnd, this);
        this.map.on("zoomstart", this.onZoomStart, this);
        this.map.on("zoom", this.onZoom, this);
    }

    init() {
        let upPane = this.upPane = document.createElement("div");
        upPane.style.left = 0;
        upPane.style.top = 0;
        let downPane = this.downPane = document.createElement("div");
        downPane.style.left = 0;
        downPane.style.top = 0;
        map.mapTilePane.appendChild(downPane);
        map.mapTilePane.appendChild(upPane);
    }

    render() {
        let map = this.map,
            zoom = map.zoom,
            center = map.center,
            resolutions = map.resolutions,
            resolution = resolutions[zoom],
            mapSize = map.size,
            padding = map.padding,
            project = map.project,
            tiles = this.tiles,
            tileSize = this.tileSize;
        // if(!Array.isArray(tiles[zoom])) {
        //     tiles[zoom] = [];
        // }

        //1 计算中心瓦片坐标
        let centerMeter = project.project(center);
        let meterPerTile = tileSize * resolution;
        let centerOffset = new Point(centerMeter.x - this.origin.x, this.origin.y - centerMeter.y);
        let centerTileCoords = centerOffset.divide(meterPerTile, meterPerTile).floor();
        //2 计算中心瓦片左上角屏幕坐标和地图中心点像素差
        let tileOffsetMeter = centerOffset.remainder(meterPerTile, meterPerTile);
        let tileOffset = tileOffsetMeter.divide(resolution, resolution);
        //3 计算瓦片行列数
        let tileCount = mapSize.divide(tileSize, tileSize).add(padding * 2, padding * 2).ceil();
        let halfTileCount = tileCount.divide(2, 2);
        let layerLeftTopMeter = centerTileCoords.sub(halfTileCount.x, -halfTileCount.y).multiply(meterPerTile, meterPerTile)
            .sub(tileOffsetMeter.x, tileOffsetMeter.y);
        let layerRinghtBottomMeter = centerTileCoords.add(halfTileCount.x, -halfTileCount.y).multiply(meterPerTile, meterPerTile)
            .sub(tileOffsetMeter.x, tileOffsetMeter.y);
        let layerBounds = new BBox(layerLeftTopMeter.x, layerLeftTopMeter.y, layerRinghtBottomMeter.x, layerRinghtBottomMeter.y);
        //4 计算瓦片屏幕坐标
        let mapPos = map.getMapPos();
        for(let i = 0, xLen = tileCount.x; i < xLen; i++) {
            for(let j = 0; j < tileCount.y; j++) {
                let coords = centerTileCoords.sub(halfTileCount.x, halfTileCount.y).add(i, j).floor();
                let leftTopMeter = coords.multiply(meterPerTile, meterPerTile);
                let rightBottomMeter = coords.add(1, 1).multiply(meterPerTile, meterPerTile);
                let tileBounds = new BBox(leftTopMeter.x, leftTopMeter.y, rightBottomMeter.x, rightBottomMeter.y);
                let cacheTile = tiles/*[zoom]*/.find(item => {return item.coords === `${coords.x}_${coords.y}`});
                if (cacheTile) {
                    continue;
                }
                let img = new Image();
                img.style.opacity = 0;
                img.onload = () => {
                    img.style.opacity = 1;
                }
                img.src = this.url.replace("{z}", zoom).replace("{x}", coords.x).replace("{y}", coords.y);
                img.className = "map-tile";
                map.mapTilePane.appendChild(img);
                let tilePx = coords.sub(centerTileCoords.x, centerTileCoords.y).multiply(tileSize, tileSize);
                let centerTilePx = mapSize.divide(2, 2).sub(tileOffset.x, tileOffset.y);
                let leftTop = tilePx.add(centerTilePx.x, centerTilePx.y);
                leftTop = leftTop.sub(mapPos[0], mapPos[1]).round();
                img.style.left = `${leftTop.x}px`;
                img.style.top = `${leftTop.y}px`;
                tiles/*[zoom]*/.push({
                    img: img,
                    bounds: tileBounds,
                    leftTop: leftTop,
                    coords: `${coords.x}_${coords.y}`
                });
            }
        }

        for(let i = 0; i < tiles/*[zoom]*/.length; i++) {
            let tile = tiles/*[zoom]*/[i];
            if(!layerBounds.contain(tile.bounds)) {
                tiles/*[zoom]*/.splice(i, 1);
                i--;
                map.mapTilePane.removeChild(tile.img);
            }
        }

    }

    onUpdate (event) {
        this.render();
    }

    onZoomEnd() {
        let {tiles, map} = this;
        for(let i = 0; i < tiles.length; i++) {
            let tile = tiles[i];
            map.mapTilePane.removeChild(tile.img);
        }
        this.tiles = [];
        this.render();
    }

    onZoomStart() {
        this.lastZoom = this.map.getZoom();
    }

    onZoom() {
        // this.zoom = this.map.getZoom();
        // this.upPane.style["z-index"] = this.zoom;
        // this.downPane.style["z-index"] = this.lastZoom;
        // if(this.zoom > this.lastZoom) { //zoomIn
        //     this.downPane.style["transform"] = "sacle(2)";
        // }else {                         //zoomOut
        //     this.downPane.style["transform"] = "sacle(0.5)";
        // }
    }
}