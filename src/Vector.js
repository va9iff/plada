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

  // subtrac vec
  // Vector => this
  sub(vec = 0) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  // multiply with num
  // Number => this
  mul(num = 1) {
    this.x *= num;
    this.y *= num;
    return this;
  }

  // divide by num
  // Number => this
  div(num = 1) {
    this.x /= num;
    this.y /= num;
    return this;
  }

  // => Number
  // length or magnitude
  len() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  // => Number
  // length square
  lensq() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  // set length to 1
  // => this
  norm() {
    if (!this.len()) return this; //0 Vector
    this.div(this.len());
    return this;
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
  projectTo(vec) {
    return vec.re().norm().mul(this.dot(vec.norm()));
  }

  // => Number
  // angle in radians
  angle() {
    return Math.atan2(this.y, this.x);
  }

  // set angle to given angle in radians
  // Number => this
  setAngle(angle) {
    let l = this.len();
    let a = angle || this.angle();
    this.x = Math.cos(a) * l;
    this.y = Math.sin(a) * l;
    return this;
  }

  // rotate this by given angle
  // Number => this
  rotate(angle = 0) {
    let l = this.len();
    let a = this.angle();
    this.x = Math.cos(angle + a) * l;
    this.y = Math.sin(angle + a) * l;
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

  // set minimum length to minlen
  // Number => this
  min(minlen) {
    minlen = minlen || this.len();
    if (this.len() < minlen) {
      return this.norm().mul(minlen);
    }
    return this;
  }

  // set maximum length to minlen
  // Number => this
  max(maxlen) {
    if (this.len() > maxlen) {
      return this.norm().mul(maxlen);
    }
    return this;
  }

  // set length to newLen
  // Number => this
  setLen(newLen) {
    this.min(newLen).max(newLen);
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

  // shortcut for .min().max()
  // Number, Number => this
  clampLen(minLen, maxLen) {
    this.min(minLen).max(maxLen);
    return this;
  }

  // Vector => Vector
  // Vector that points to vec from this
  vectorTo(vec) {
    return vec.re().sub(this);
  }

  // Vector => Number
  // distance from V to vec
  distanceTo(vec) {
    return this.vectorTo(vec).len();
  }
}
// import { Vector } from "./vector.js";