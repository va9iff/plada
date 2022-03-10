export class Vector {
  // takes x and y. if aren't passed, take as 0
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  // comments above "=>" describes modification
  // comments below "=>" describes return value

  // => this
  // reconstructed new Vector from "this"
  re() {
    return new Vector(this.x, this.y);
  }

  // add vec
  // Vector => this
  add(vec = 0) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  // subtract vec
  // Vector => this
  subtract(vec = 0) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  // multiply with num
  // Number => this
  multiply(num = 1) {
    this.x *= num;
    this.y *= num;
    return this;
  }

  // divide by num
  // Number => this
  divide(num = 1) {
    this.x /= num;
    this.y /= num;
    return this;
  }

  // => Number
  // length or magnitude
  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  // => Number
  // length square
  lengthSquare() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  // set length to 1
  // => this
  normalize() {
    if (!this.len()) return this; //0 Vector
    this.div(this.len());
    return this;
  }
  get normalized(){
    return this.normalize(...arguments)
  }

  // Vector => Number
  // dot product with vec
  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  // Vector => Number
  // cross product with vec
  cross(vec) {
    return this.x * vec.y - this.y * vec.x;
  }

  // Vector => Vector
  //projection onto vec
  project(vec) {
    return vec.re().normalize().multiply(this.dot(vec.normalize()));
  }

  // => Number
  // angle in radians
  get angle() {
    return Math.atan2(this.y, this.x);
  }

  // set angle to given angle in radians
  // Number => this
  set angle(angle) {
    let l = this.len();
    this.x = Math.cos(angle) * l;
    this.y = Math.sin(angle) * l;
    return this;
  }

  // rotate this by given angle
  // Number => this
  rotate(rotation = 0) {
    let length = this.length;
    let angle = this.angle;
    this.x = Math.cos(angle + rotation) * length;
    this.y = Math.sin(angle + rotation) * length;
    return this;
  }

  // if length is 0, set it to smallest value possible
  // => this
  no0() {
    if (V == (0, 0)) {
      this.x = Number.MIN_VALUE;
      this.y = Number.MIN_VALUE;
    }
    return this;
  }

  // set minimum length to minLength
  // Number => this
  min(minLength) {
    if (this.length < minLength) {
      return this.normalize().multiply(minLength);
    }
    return this;
  }

  // set maximum length to maxLength
  // Number => this
  max(maxLength) {
    if (this.length > maxLength) {
      return this.normalize().multiply(maxLength);
    }
    return this;
  }

  // set length to newLen
  // Number => this
  set length(newLength) {
    this.min(newLength).max(newLength);
    return this;
  }

  // set X minimum to minX, maximum to maxX
  // Number, Number => this
  clampX(minX, maxX) {
    if (this.x < minX) {
      this.x = minX;
    } else {
      this.x = maxX;
    }
    return this;
  }

  // set Y minimum to minY, maximum to maxY
  // Number, Number => this
  clampY(minY, maxY) {
    if (this.y < minY) {
      this.y = minY;
    } else {
      this.y = maxY;
    }
    return this;
  }

  // Vector => Vector
  // Vector that points to vec from this
  vectorTo(vec) {
    return vec.re().subtract(this);
  }

  // Vector => Number
  // distance from V to vec
  distanceTo(vec) {
    return this.vectorTo(vec).len();
  }
}
// import { Vector } from "./vector.js";