import React from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'

export const Paragraph = ({inPreviewMode, editingWidget,  widget, textChanged}) => {
    let inputElem
    return (
        <div>
            <div hidden={inPreviewMode || (editingWidget != null && widget.id != editingWidget)}>
                <textarea
                    placeholder="Paragraph text"
                    ref={node => inputElem = node}
                    value={widget.text}
                    onChange={() => textChanged(widget.id, inputElem.value)}></textarea>
            </div>

            Preview paragraph
            <div class="card-footer text-muted">
                <br/>
                {widget.text}
            </div>
        </div>
    )
}

const dispatchMapper = dispatch => ({
    textChanged: (id, text) => actions.headingTextChanged(dispatch, id, text)
})

const stateMapper = (state) => (
    {inPreviewMode: state.preview, editingWidget: state.editingWidget}
)

export const ParagraphContainer = connect(stateMapper, dispatchMapper)(Paragraph)