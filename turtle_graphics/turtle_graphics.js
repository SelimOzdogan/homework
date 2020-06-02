
class Turtle {
    #blankSign = '\u25FD';
    #markedSign = '\u25FE';

    constructor(x, y) {
        this.y = x;
        this.x = y;
        this.points = [];
        this.points.push([this.x, this.y]);
        this.directionTypes = {
            toRight: 0,
            toDown: 1,
            toLeft: 2,
            toUp: 3
        }
        this.direction = this.directionTypes.toRight;
    }

    right() {
        this.direction = (++this.direction % 4);
        return this;
    }
    left() {
        let newDirection = (--this.direction % 4);
        if (newDirection == -1)
            this.direction = this.directionTypes.toUp;
        else
            this.direction = newDirection;
        return this;
    }
    forward(count) {
        this.x = (this.x < 0 ? 0 : this.x);
        this.y = (this.y < 0 ? 0 : this.y);
        for (let i = 0; i < count; i++) {
            switch (this.direction) {
                case this.directionTypes.toRight:
                    this.points.push([this.x, ++this.y]); break;
                case this.directionTypes.toLeft:
                    this.points.push([this.x, (--this.y < 0 ? 0 : this.y)]); break;
                case this.directionTypes.toDown:
                    this.points.push([++this.x, this.y]); break;
                case this.directionTypes.toUp:
                    this.points.push([(--this.x < 0 ? 0 : this.x), this.y]); break;
            }
        }
        return this;
    }
    allPoints() {
        return this.points;
    }
    print() {
        let out = [];
        let maxX = Math.max(...this.points.map(x => x[0]));
        let maxY = Math.max(...this.points.map(x => x[1]));
        for (let i = 0; i <= maxX; i++) {
            for (let j = 0; j <= maxY; j++) {
                if (out[i] === undefined)
                    out[i] = new Array();
                if (out[i][j] === undefined)
                    out[i][j] = new Array();
                out[i][j] = this.#blankSign;
            }
        }
        this.points.forEach(element => {
            try {
                out[element[0]][element[1]] = this.#markedSign;
            }
            catch (err) {
                console.log(err);
            }
        });
        let str = '';
        for (let i = 0; i <= maxX; i++) {
            for (let j = 0; j <= maxY; j++) {
                str += out[i][j];
            }
            str += "\n";
        }
        console.log(str);
    }
}