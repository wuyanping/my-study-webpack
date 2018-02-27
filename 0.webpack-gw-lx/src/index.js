import _ from 'lodash';
import { cube } from './math.js';
import printMe from './print.js';
import './styles.css'

if (process.env.NODE_ENV !== 'production') {
  	console.log('看起来我们的dev模式!');
}

function component() {
    // var element = document.createElement('div');
    var element = document.createElement("pre")
    var btn = document.createElement('button');
  
    // Lodash, currently included via a script, is required for this line to work
    // Lodash, now imported by this script
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    btn.innerHTML = 'Click me and check the console!';
    element.innerHTML = [
  		'hello webpack',
  		'5立方=' + cube(5)
    ].join('\n\n')
    btn.onclick = printMe;
  
    element.appendChild(btn);
  
    return element;
}

// document.body.appendChild(component())
let element = component() // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element)

// console.log(11)

if (module.hot) {
	module.hot.accept('./print.js', function() {
	    console.log('接受更新的printMe模块!')
	    printMe()
	    document.body.removeChild(element)
		element = component() // 重新渲染页面后，component 更新 click 事件处理
		document.body.appendChild(element)
	})
}