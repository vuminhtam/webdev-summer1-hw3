import {addWidget, findAllWidgets, save, preview} from "../actions";
import React from "react";
import {connect } from 'react-redux'
import {WidgetContainer} from "../component/widgetItem";

export default
class WidgetList extends React.Component {
    constructor(props) {
        super(props)
        this.props.findAllWidgets()
    }
    render() {
        return(
            <div>
                <img src="https://goo.gl/images/5UTfWW" alt="Your image preview"></img>

                <h1>Widget List {this.props.widgets.length}</h1>

                <button hidden={this.props.inPreviewMode}
                        onClick={this.props.save}>
                    Save
                </button>
                <button onClick={this.props.preview}>
                    Preview
                </button>

                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetContainer widget={widget}
                                         key={widget.id}
                                         inPreviewMode={this.props.inPreviewMode}/>
                    ))}
                </ul>
                <button
                    hidden={this.props.inPreviewMode}
                    onClick={this.props.addWidget}>Add</button>
            </div>
        )
    }
}


export const stateMapper = (state) => (
    {widgets: state.widgets,
    inPreviewMode: state.preview}
)

export const dispatchMapper = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch),
    addWidget: () => addWidget(dispatch),
    save: () => save(dispatch),
    preview: () => preview(dispatch)
})


export const WidgetListApp = connect(stateMapper, dispatchMapper)(WidgetList)
