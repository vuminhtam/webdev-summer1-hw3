import React from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'
import {ORDERED_LIST, UNORDERED_LIST} from "../constants/widgetType";

export const List = ({inPreviewMode, editingWidget, widget, textChanged, listTypeChanged}) => {
    let inputElem
    let listType
    return (
        <div>
            <div hidden={inPreviewMode || (editingWidget != null && widget.id != editingWidget)}>
                <textarea
                    placeholder="Enter one list item per line"
                    ref={node => inputElem = node}
                    defaultValue={widget.text}
                    onChange={() => textChanged(widget.id, inputElem.value)}></textarea>
                <br/>
                <select
                    ref={node => listType = node}
                    onChange={() => listTypeChanged(widget.id, listType.value)}>
                    <option>Unordered list</option>
                    <option>Ordered list</option>
                </select>
            </div>

            Preview {widget.listType} items
            <div class="card-footer text-muted">
                {widget.listType == ORDERED_LIST && <ol>{textToHTML(widget.text)}</ol>}
                {widget.listType == UNORDERED_LIST && <ul>{textToHTML(widget.text)}</ul>}
            </div>
        </div>
    )
}

export const textToHTML = (text) => {
    var order = 0;
    var lines = text.split("\n")
    return lines.map(function(aline) {
       return <li key={order++}>{aline}</li>
    })
}

const dispatchMapper = dispatch => ({
    textChanged: (id, text) => actions.headingTextChanged(dispatch, id, text),
    listTypeChanged: (id, type) => actions.listTypeChanged(dispatch, id, type)
})

const stateMapper = (state) => (
    {inPreviewMode: state.preview, editingWidget: state.editingWidget}
)

export const ListContainer = connect(stateMapper, dispatchMapper)(List)