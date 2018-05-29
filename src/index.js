import React from 'react'
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

let initialState = {
    widgets:
        [{id:1, text: 'Widget 1'},
        {id:2, text: 'Widget 2'}]
}

const Widget = ({widget, dispatch}) => (
    <li>
        {widget.text}
        <button onClick={e => (
            dispatch(
                {type: 'DELETE_WIDGET',
                id: widget.id})
        )}>Delete</button>
    </li>
)

const WidgetContainer = connect()(Widget)

const WidgetList = ({widgets, dispatch}) => (
    <div>
        <h1>WidgetList ({widgets.length})</h1>
        <ul>
            {widgets.map(widget => (
                <WidgetContainer widget={widget}
                        key={widget.id}/>
            ))}
        </ul>
        <button onClick={e => (dispatch({type: 'ADD_WIDGET'}))}>Add</button>
    </div>
)

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_WIDGET':
            console.log('add widget')
            return {
                widgets : [
                    ...state.widgets,
                    {text: 'New widget'}
                ]
            }
        case 'DELETE_WIDGET':
            console.log('delete widget')
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }
        default:
            return state
    }
}

const mapper = (state) => (
    {widgets: state.widgets}
)

const App = connect(mapper)(WidgetList)

ReactDOM.render(
    <Provider store={createStore(reducer)}>
        <App/>
    </Provider>,
    document.getElementById('root')
)