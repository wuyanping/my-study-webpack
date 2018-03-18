import React, {Component} from 'react'
import styles from './Greeter.css'
var config = require('./config.json')

// module.exports = function () {
// 	var greet = document.createElement('div')
// 	greet.textContent = config.greetText
// 	return greet
// }

class Greeter extends Component {
	render() {
		return (
			<div className={styles.root}>
				aa{config.greetText} haha
			</div>
		)
	}
}

export default Greeter