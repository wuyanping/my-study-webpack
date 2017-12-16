require("style/style")
require("style/index")
// var hello = require("./js/hello.js");
// hello();

// var cs = require('./js/cs.js')
// cs()

var img1 = new Image();
img1.src = require("3d2.jpg");

var img2 = new Image();
img2.src = require("home.png");

document.body.appendChild(img1);
document.body.appendChild(img2);


// import React from 'react';
// import ReactDOM from 'react-dom';
import Hello from 'hello';

ReactDOM.render(<Hello/>,document.getElementById('app'))


