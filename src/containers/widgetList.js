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
        console.log(this.props)
        return(
            <div>
                <h1>LESSON EDITOR</h1>

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
                    onClick={this.props.addWidget}>Add</button>
            </div>
        )
    }
}


export const stateMapper = (state) => (
    {widgets: state.widgets,
    inPreviewMode: state.preview,
    editingWidget: state.editingWidget}
)

export const dispatchMapper = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch),
    addWidget: () => addWidget(dispatch),
    save: () => save(dispatch),
    preview: () => preview(dispatch)
})


export const WidgetListApp = connect(stateMapper, dispatchMapper)(WidgetList)
