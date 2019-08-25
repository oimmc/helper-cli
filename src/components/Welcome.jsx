import React from 'react'
import logo from '../assets/img/logo.png'
import './style.less'

class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            welcome: 'Welcome'
        }
    }

    render() {
        return (
			<div className="welcome">
				<img src={logo} alt="logo" width="100" />
				<div>
					{ this.state.welcome } <a href="https://github.com/wangyajundev/helper-cli" target="_blink">helper-cli</a>
				</div>
			</div>
        )
    }
}
export default Welcome
