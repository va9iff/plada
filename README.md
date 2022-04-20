# Plada  

#### simulation and game library with clean syntax

## Why?
When you try to make a simple project without mind blowing graphics and 
performance intense tasks, that complicated features become bloat for you. 
Plada provides you a clean way to write your code. Yes, code. UI isn't the
simplest always. 

## Getting started
#### ES6 Modules import
```js
// TODO: include what other features you need
import { Body, Vector } from "https://raw.githubusercontent.com/va9iff/plada/main/import.js?token=GHSAT0AAAAAABOZ3A2YRROCPEUPCAR24DSYYS7QADA"
```

## Basics
`Body` class is a circle that can collide and move. Inherit from it.

```js
class Player extends Body{
	position = new Vector(80, 120)
}
```

You can define properties directly in the class field, or after initialization.

```js
let myPlayer = new Player()
myPlayer.velocity = v(20, 30) // short for new Vectr(20,30)
```

## Vector
Plada has its own vector library to provide semantically correct way of 
calculating instead of doing everything with functions.  
```js
let u = new Vector(3, 4)
console.log(u.length) // 5
u.angle = 0
console.log(u) // Vector(0, 5)
```

If a method's name sounds like it mutates the vector, it mutates.
```js
let i = new Vector(1, 0)
let j = new Vector(0, 1)
j.vectorTo(i) // doesn't mutate j. returns vector from j to i - Vector(1,-1)
j.add(i) // j is mutated - j = Vector(1,1)
```
If you want to return mutated value but don't want to mutate the actual vector, 
do it on copy - `j.copy.add(i)`

### Here the avaliable methods  
`this` refers to vector that the method is called on.

| Method 						 | Description									|
<!-- | ---:						 |										:--- | -->
|--------------------------------|----------------------------------------------|
| `.add(vec)`					 | adds `vec` to `this`							|
| `.subtract(vec)`				 | subtracts `vec` from `this`					|
| `.multiply(num)`				 | multiplies this with `num`					|
| `.divide(num)`				 | divides this to `num`						|
| `.get length()`				 | returns to length of `this`					|
| `.get lengthSquare()`			 | returns squared length						|
| `.normalize()`				 | sets length to 1								|
| `.dotProduct(vec)`			 | dot product of `this` with `vec`				|
| `.crossProduct(vec)`			 | cross product of `this` with `vec`			|
| `.project(vec)`				 | projects `this` on `vec`						|
| `.get angle()`				 | returns the angle of `this` (radians)		|
| `.set angle(angle)`			 | sets angle of this to `angle`				|
| `.rotate(rotation)`			 | rotates `this` by given `rotation`			|
| `.no0()`						 | sets vector to minimum none-zero vector		|
| `.min(minLength)`				 | if length is less than `minLength`, set to it|
| `.max(maxLength)`				 | if length is more than `maxLength`, set to it|
| `.set length(newLength)`		 | sets length of this to `newLength`			|
| `.clampX(minX, maxX)`			 | short way to make minX&lt;`this.x`&lt;MaxX	|
| `.clampY(minY, maxY)`			 | short way to make minY&lt;`this.y`&lt;MaxY	|
| `.vectorTo(vec)`				 | returns to a vector from `this` to `vec`		|
| `.distanceTo(vec)`			 | returns to the distance from `this` to `vec`	|
