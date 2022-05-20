# Plada  

#### Simulation library highly focused on syntax and clean code.

## Why?
When you try to make a simple project without mind blowing graphics and 
performance intensive tasks, that complicated features become bloat for you. 
Plada provides you a clean way to write your code. Yes, code. UI isn't the
simplest always. 

## Getting started
#### ES6 Modules import
```js
import { Plada, Body, Vector } from "https://raw.githubusercontent.com/va9iff/plada/main/import.js"
Plada.simple()
```
Plada is modular and there are a lots of ways to use it. Setup can vary 
depending on your needs. The easiest and clean way is to use `Plada.simple()`.

# Body
```js
class Player extends Body{
	hp = 100
	age = 0

	constructor(){
		this.position = new Vector(100 * Math.random(), 100 * Math.random())
	}

	frame(){
		this.age += delta
		if (this.hp <= 0) this.remove()
	}
}

let myPlayer = new Player()
myPlayer.velocity = v(20, 30) // short for new Vectr(20,30)

```
Properties can be defined either in the class field or after/during the 
initialization. 

### `frame()` and `delta`
This function is called every frame. The `delta` variable on the function is a 
global variable that its value is the time passed since the last frame. Every 
frame it is calculated. You shouldn't use `delta` outside of `frame()`.

### Collision

```js
class Blue extends Body{
	color = "blue"
	position = v(20,30)
	velocity = v(40,40)
}

class Red extends Body{
	color = "red"
	position = v(100,120)
}

// class level - for every instance of Blue and Red
Blue.collide(Red).during = (blue,red)=>{
	let force = v(0.2,0.3)
	red.velocity.add(force)
}

// you can use during/start/stop on instance but not at the class level
let b = new Blue()
let r = new Red()
b.collide(r).start = ()=> alert("collide started")
```

## additional features
- relative positioning - `a` and `b` is a `Body`. If `a`'s `origin` is `b`, `a` 
will be positioned relative to `b`.

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

### Avaliable methods  

| Method 						 | Description									|
| ------------------------------ | -------------------------------------------- |
| `.add(vec)`					 | adds `vec` to `this`							|
| `.subtract(vec)`				 | subtracts `vec` from `this`					|
| `.multiply(num)`				 | multiplies this with `num`					|
| `.divide(num)`				 | divides this to `num`						|
| `.length`						 | returns the length of `this`					|
| `.lengthSquare`				 | returns squared length						|
| `.normalize()`				 | sets length to 1								|
| `.dotProduct(vec)`			 | dot product of `this` with `vec`				|
| `.crossProduct(vec)`			 | cross product of `this` with `vec`			|
| `.project(vec)`				 | projects `this` on `vec`						|
| `.angle`						 | returns the angle of `this` (radians)		|
| `.angle = a`					 | sets the angle of this to `a`				|
| `.rotate(rotation)`			 | rotates `this` by given `rotation`			|
| `.no0()`						 | sets vector to minimum none-zero vector		|
| `.min(minLength)`				 | if length is less than `minLength`, set to it|
| `.max(maxLength)`				 | if length is more than `maxLength`, set to it|
| `.length = newLength`			 | sets length of this to `newLength`			|
| `.clampX(minX, maxX)`			 | short way to make minX&lt;`this.x`&lt;MaxX	|
| `.clampY(minY, maxY)`			 | short way to make minY&lt;`this.y`&lt;MaxY	|
| `.vectorTo(vec)`				 | returns to a vector from `this` to `vec`		|
| `.distanceTo(vec)`			 | returns to the distance from `this` to `vec`	|
