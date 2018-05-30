import {addWidget, findAllWidgets, save, preview, findAllWidgetsByLessonID} from "../actions";
import React from "react";
import {connect } from 'react-redux'
import {WidgetContainer} from "../component/widgetItem";
import {Badge, Button} from 'react-bootstrap';

export default
class WidgetList extends React.Component {
    constructor(props) {
        super(props)
        this.props.findAllWidgetsByLessonID(this.props.match.params.tid)
    }

    render() {
        return(
            <div>

                <h1>CONTENT EDITOR
                    <span className="badge badge-light">{this.props.widgets.length}</span>
                </h1>

                <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                <button class="btn btn-success"
                    hidden={this.props.inPreviewMode}
                    onClick={this.props.save}>
                    <i className="fas fa-save"></i>
                </button>
                <button class="btn btn-secondary"
                    onClick={this.props.preview}>
                    {setPreviewText(this.props.inPreviewMode)}
                </button>
                </div>


                <div className="card">
                    <ul className="list-group list-group-flush">
                        {this.props.widgets.map(widget => (
                            <WidgetContainer widget={widget}
                                             key={widget.id}
                                             inPreviewMode={this.props.inPreviewMode}/>
                        ))}
                    </ul>
                </div>

                <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                <button
                    class="btn-primary"
                    onClick={this.props.addWidget}>
                    <i className="fas fa-plus"></i> Add Widget
                </button>
                </div>
            </div>
        )
    }
}

const setPreviewText = (inMode) => {
    if(!inMode) {
        return <i className="far fa-eye"></i>
    } else {
        return <i className="fas fa-chevron-left"> Edit all </i>
    }
}


export const stateMapper = (state) => (
    {widgets: state.widgets,
    inPreviewMode: state.preview,
    editingWidget: state.editingWidget}
)

export const dispatchMapper = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch),
    findAllWidgetsByLessonID: (id) => findAllWidgetsByLessonID(id, dispatch),
    addWidget: () => addWidget(dispatch),
    save: () => save(dispatch),
    preview: () => preview(dispatch)
})


export const WidgetListApp = connect(stateMapper, dispatchMapper)(WidgetList)
