import React from 'react'
import Loadable from './Loadable'

/* eslint-disable-next-line */
const Welcome = Loadable(() => import(/* webpackChunkName: 'welcome' */ './components/Welcome'))

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Welcome />
            </div>
        )
    }
}
export default App
