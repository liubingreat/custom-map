class BBox{
    constructor(options, top, right, buttom) {
        if(typeof options === "object") {
            this.left = options.left;
            this.top = options.top;
            this.right = options.right;
            this.buttom = options.buttom;
        }else {
            this.left = options;
            this.top = top;
            this.right = right;
            this.buttom = buttom;
        }
    }

    toBBox(leftTop, rightButtom) {
        return new BBox({
            left: leftTop.x,
            top: leftTop.y,
            right: rightButtom.x,
            buttom: rightButtom.y
        });
    }

    contain(bbox) {
        return this.left <= bbox.left &&
            this.top >= bbox.top &&
            this.right >= bbox.right &&
            this.buttom <= bbox.buttom;
    }
}