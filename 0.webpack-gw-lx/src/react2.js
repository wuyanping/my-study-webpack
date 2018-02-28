// var chunk2=2;
// export default chunk2 = chunk2

import RCom from './reactComtg'
import React3 from './react3.js'
class Hello extends React.Component{
	render(){
		return <div>222<RCom /></div>
	}
}
ReactDOM.render(<Hello/>,document.getElementById('app'))
