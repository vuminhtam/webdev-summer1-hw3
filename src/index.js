import React from 'react'
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'


//service
const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: 'FIND_ALL_WIDGETS',
            widgets: widgets }))
}

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

class WidgetList extends React.Component {
    constructor(props) {
        super(props)
        this.props.findAllWidgets()
    }
    render() {
        return(
            <div>
                <h1>Widget List {this.props.widgets.length}</h1>

                <button hidden={this.props.previewMode} onClick={this.props.save}>
                    Save
                </button>

                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetContainer widget={widget}
                                         key={widget.id}/>
                    ))}
                </ul>
                <button onClick={e => (
                    this.props.dispatch({type: 'ADD_WIDGET'})
                )}>Add</button>
            </div>
        )
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FIND_ALL_WIDGETS':
            return {
                widgets: action.widgets
            }
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

const stateMapper = (state) => (
    {widgets: state.widgets}
)

const dispatchMapper = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch)
})


const App = connect(stateMapper, dispatchMapper)(WidgetList)

ReactDOM.render(
    <Provider store={createStore(reducer)}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

