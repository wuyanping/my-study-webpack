import RCom from './reactComtg'
class Hello extends React.Component{
	render(){
		return <div>222<RCom /></div>
	}
}
ReactDOM.render(<Hello/>,document.getElementById('app'))