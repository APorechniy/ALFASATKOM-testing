import { Route, Switch } from 'react-router-dom';

import Main from '../Main/Main.js';

function Routers() {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Main}></Route>
            </Switch>
        </main>
    )
}

export default Routers;