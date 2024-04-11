# Node.js Sil
---


## Goals for Student Initiated Learning (2024)


### Items to be achieved:

- [ ] Learn the *basics* of Node.js
- [ ] Learn the *background and origin* of Node.js
- [ ] Learn the *pros and cons* of Node.js
- [ ] learn *intermediate concepts* of Node.js
- [ ] Create a simple *project*
- [ ] tbd

      
### Helpful resources
overall just helpful:
- [node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [mdndocs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [w3schools](https://www.w3schools.com/jsref/)
- [geeksforgeeks](https://www.geeksforgeeks.org/)

helpful in editing this readme.md:
- [markdownguide](https://www.markdownguide.org/extended-syntax/)


### Project Links
- [Simple Math Game](SIL-code/Simple_Logics/index.js)



---


# My understanding of Node.js


## What is node.js
According to [Wikipedia](https://en.wikipedia.org/wiki/Node.js)
- Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more. Node.js runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting.

From what I understand from reading up, Javascript is mostly used in making interactive and dynamic websites. While node.js is a console focused, back-end runtime that lets you run server-side JavaScript outside of a web browser. I think that it is important to differenciate node.js from pure js, as they ["serve different purposes in the web development ecosystem."](https://reintech.io/blog/difference-between-nodejs-and-javascript) 


## Why use node.js
According to [miquido](https://www.miquido.com/blog/why-use-node-js/), node.js is not only scalable, fast, efficient, cross-platform adaptable, high performance and easy to learn. The node.js community is also huge, allowing for many innovative creations, tutorials, blogs, and creative codebases.
Learning node.js can also carry over into many different frameworks and applications. 

---


# Learning the basics


## Logging, Variables, Types, and If Else Logic

One of the most important building blocks of code and programs are *Logging, Variables, Types, and If Else Logic* 
While writing code with these in them may seem easy, i think mastering the use of them efficiently may need some practice.


### Logging

As i have prior experience in [Python](https://www.python.org/), this instantly makes me think of:

```python
print("hi")
```

While javascript(the language of node.js) is a different language, the syntax is similar, unlike lower level languages like C++.
In js(javascript), outputing a value to the console is as simple as calling the `"console.log()"` method:

```javascript
console.log("hi");
```
> important to put the semicolon as it signifies the end of a line for the interpreter


### Variables

Variables is one of the most well-known concepts related to programming, and so did not need a introduction to this.
Variables are even in math, physics and in block coding apps. 
Accessing and changing a variable in js is almost identical to python's syntax but initializing one is something i have to keep in mind.
After doing research and browsing several web pages, i have come to understand what different initializing keywords achieve and what situations are best fitted for them.


What i learnt:

There are 3 keywords used in initializing a variable, `var`, `let`, and `const`.
- `var` creates a *global*, or functional sometimes (important) variable.
- `let` creates a variable that can be changed and accessed in the scope it was initialized in.
- `const` creats a *constant* variable(as suggested by its name) that cannot be changed, only accessed.

A (very)helpful table i found on [www.geeksforgeeks.org](https://www.geeksforgeeks.org/difference-between-var-let-and-const-keywords-in-javascript/) below:

| var      | let | const     |
| :---        |    :----:   |          ---: |
| The scope of a var variable is functional or global scope.|	The scope of a let variable is block scope.|	The scope of a const variable is block scope.   |
|It can be updated and re-declared in the same scope.|	It can be updated but cannot be re-declared in the same scope.|	It can neither be updated or re-declared in any scope.|
|It can be declared without initialization.|	It can be declared without initialization.|	It cannot be declared without initialization.|
|It can be accessed without initialization as its default value is “undefined”.|	It cannot be accessed without initialization otherwise it will give ‘referenceError’.|	It cannot be accessed without initialization, as it cannot be declared without initialization.|
|These variables are hoisted.|	These variables are hoisted but stay in the temporal dead zone until the initialization.|	These variables are hoisted but stays in the temporal dead zone until the initialization.|

from [www.geeksforgeeks.org](https://www.geeksforgeeks.org/difference-between-var-let-and-const-keywords-in-javascript/) too:
> Note: Sometimes, users face problems while working with the var variable as they change its value of it in a particular block. So, users should use the let and const keywords to declare a variable in JavaScript. 

Using this in a real js example:

```javascript
let variableone;
var variabletwo = "two";
const variablethree = ["one","two","three"]; 
```

where the format is 
keyword variablename = value;
or
keyword variablename;
if we decide just to initiate, but not assign.


### Types

A quick google search results in this as the top response:

JavaScript has 8 Datatypes
- String
- Number
- Bigint
- Boolean
- Undefined
- Null
- Symbol
- Object

As some of these seem new and weird i have decided to only focus on 3 for now, String, Number and Boolean.


### If Else Logic

A core element of code is conditional statements. 
In js the syntax for a if else statement is this:


```javascript
if (true){
  console.log("condition is true")
} else {
  console.log("condition is false")
}
```

^Quite easy to understand.

> I actually like this curlybracket and bracket style as it makes the code more readable.


## Simple conditional program

After going through the basics i feel like i am ready to create a simple program.

I created a index.js file in SIL-code/Simple_logics [here](SIL-code/Simple_logics/index.js)
I also connected this github repo to a Replit repl so i can more efficiently write, test, and update code
![screenshotofreplit](images/replitscreenshot.png)

After installing a input node.js module, ´npm install prompt-sync´ I got this code from the internet.

```javascript
const prompt = require('prompt-sync')();

const name = prompt('What is your name?');
console.log(`Hey there ${name}`);
```
Simple code but we can build and change it into a interesting math game.

```javascript
const prompt = require("prompt-sync")();

let firstnumber = 2;
let secondnumber = 3;
let result = String(firstnumber + secondnumber);

let response = prompt(`What is ${firstnumber} + ${secondnumber}?: `);

if (response == result) {
  console.log("Yes you got it correct");
} else {
  console.log("No you got it wrong");
}
```
Where the user is asked a simple math math question, 2+3 and the program, using if else statements 
Lets improve it by using Math.random() to generate a randome addition problem, and also make it a loop where the progam will keep asking for input until the user gets it right.

```javascript


const prompt = require("prompt-sync")();


function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}


let firstnumber = getRandomIntInclusive(1, 30);
let secondnumber = getRandomIntInclusive(1, 30);
let result = String(firstnumber + secondnumber);
let correctanswer = false
let response;

while (correctanswer == false){
  response = prompt(`What is ${firstnumber} + ${secondnumber}?: `);

  if (response == result) {
    console.log("Yes you got it correct");
    correctanswer = true
  } else {
    console.log("No you got it wrong");
  }
}
```

output:
```shell
What is 26 + 30?: 22
No you got it wrong
What is 26 + 30?: 1234154151
No you got it wrong
What is 26 + 30?: 57442124141212421532513124122413
No you got it wrong
What is 26 + 30?: 123
No you got it wrong
What is 26 + 30?: 235253241
No you got it wrong
What is 26 + 30?: 66
No you got it wrong
What is 26 + 30?: 56
Yes you got it correct
```
It seems to work. 

Improving the code:
```shell
What is 1 * 12?: 12
Yes you got it correct
What is 11 + 27?: 38
Yes you got it correct
What is 4 * 15?: 60
Yes you got it correct
What is 18 * 3?: 46
No you got it wrong
What is 18 * 3?: 56
No you got it wrong
What is 18 * 3?: 54
Yes you got it correct
What is 26 + 8?: 34
Yes you got it correct
What is 13 + 15?: 28
Yes you got it correct
What is 9 + 6?: 15
Yes you got it correct
What is 30 - 25?: 5
Yes you got it correct
What is 21 * 25?: 525
Yes you got it correct
What is 13 - 26?: -13
Yes you got it correct
Your score is 2589
```
