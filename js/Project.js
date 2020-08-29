//wgs84->epsg:3857
const R = 6378137;
const MAX_LATITUDE= 85.0511287798;
class Project{
    project (lonlat) {
        let d = Math.PI / 180,
            max = MAX_LATITUDE,
            lat = Math.max(Math.min(max, lonlat.lat), -max),
            sin = Math.sin(lat * d);

        return new Point(
            R * lonlat.lon * d,
            R * Math.log((1 + sin) / (1 - sin)) / 2);
    }

    unproject (point) {
        var d = 180 / Math.PI;
        return new LonLat(
            point.x * d / R,
            (2 * Math.atan(Math.exp(point.y / R)) - (Math.PI / 2)) * d);
    }

    bounds() {
        var d = R * Math.PI;
        return new BBox().toBBox(
            new Point(-d, d),
            new Point(d, -d)
        );
    }
}