import React from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'

export const Paragraph = ({inPreviewMode, widget, textChanged}) => {
    let inputElem
    return (
        <div>
            <div hidden={inPreviewMode}>
                <textarea
                    placeholder="Paragraph text"
                    ref={node => inputElem = node}
                    value={widget.text}
                    onChange={() => textChanged(widget.id, inputElem.value)}></textarea>
            </div>

            <div>
                Preview paragraph
                <br/>
                {widget.text}
            </div>
        </div>
    )
}

const dispatchMapper = dispatch => ({
    textChanged: (id, text) => actions.headingTextChanged(dispatch, id, text)
})

const stateMapper = state => ({
    inPreviewMode: state.preview
})

export const ParagraphContainer = connect(stateMapper, dispatchMapper)(Paragraph)