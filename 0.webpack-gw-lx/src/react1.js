import RCom from './reactComtg.js'
class Hello extends React.Component{
	render(){
		return <div>11<RCom /></div>
	}
}
ReactDOM.render(<Hello/>,document.getElementById('app'))