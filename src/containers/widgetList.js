import {addWidget, findAllWidgets} from "../actions";
import React from "react";
import {connect } from 'react-redux'
import {WidgetContainer} from "../component/widgetItem";

export default class WidgetList extends React.Component {
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
                <button onClick={this.props.addWidget}>Add</button>
            </div>
        )
    }
}


export const stateMapper = (state) => (
    {widgets: state.widgets}
)

export const dispatchMapper = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch),
    addWidget: () => addWidget(dispatch)
})


export const WidgetListApp = connect(stateMapper, dispatchMapper)(WidgetList)
