import React from 'react'
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route} from 'react-router-dom'
import { createStore } from 'redux'
import { Provider} from 'react-redux'
import {widgetReducer} from "./reducer/widgetReducer";
import {WidgetListApp} from "./containers/widgetList";



window.onbeforeunload = function() {
    return "Are you sure you want to navigate away?";
}

ReactDOM.render(
    <Router>

    <Provider store={createStore(widgetReducer)}>
        <Route
            path="/topic/:tid/widget"
            component={ WidgetListApp }>
        </Route>
    </Provider>
    </Router>,
    document.getElementById('root')
)

