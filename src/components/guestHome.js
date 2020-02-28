import React, {Component} from 'react';

import Authentication from './authentication'

class GuestHome extends Component {
    render() {
        return (
            <div>
                <h1>Festive Holiday Cocktails App</h1>
                <Authentication />
            </div>
        )
    }
}

export default GuestHome;