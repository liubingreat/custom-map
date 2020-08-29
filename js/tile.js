class Tile{
    constructor(options) {
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
            tileSize = this.tileSize;
        //1 计算中心瓦片坐标
        let centerMeter = project.project(center);
        let meterPerTile = tileSize * resolution;
        let centerOffset = new Point(centerMeter.x - this.origin.x, this.origin.y - centerMeter.y);
        let centerTileCoords = centerOffset.divide(meterPerTile, meterPerTile).floor();
        //2 计算中心瓦片左上角屏幕坐标和地图中心点像素差
        let tileOffset = centerOffset.remainder(meterPerTile, meterPerTile).divide(resolution, resolution);
        //3 计算瓦片行列数
        let tileCount = mapSize.divide(tileSize, tileSize).add(padding * 2, padding * 2).ceil();
        let halfTileCount = tileCount.divide(2, 2);

        //4 计算瓦片屏幕坐标
        for(let i = 0, xLen = tileCount.x; i < xLen; i++) {
            for(let j = 0; j < tileCount.y; j++) {
                let coords = centerTileCoords.sub(halfTileCount.x, halfTileCount.y).add(i, j).floor();
                let img = new Image();
                img.src = this.url.replace("{z}", zoom).replace("{x}", coords.x).replace("{y}", coords.y);
                img.className = "map-tile";
                map.mapTilePane.appendChild(img);
                let tilePx = coords.sub(centerTileCoords.x, centerTileCoords.y).multiply(tileSize, tileSize);
                let centerTilePx = mapSize.divide(2, 2).sub(tileOffset.x, tileOffset.y);
                let leftTop = tilePx.add(centerTilePx.x, centerTilePx.y);
                img.style.left = `${leftTop.x}px`;
                img.style.top = `${leftTop.y}px`;
            }
        }
    }
}