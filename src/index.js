import React from 'react'
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider} from 'react-redux'
import {widgetReducer} from "./reducer/widgetReducer";
import {WidgetListApp} from "./containers/widgetList";

ReactDOM.render(
    <Provider store={createStore(widgetReducer)}>
        <WidgetListApp/>
    </Provider>,
    document.getElementById('root')
)

