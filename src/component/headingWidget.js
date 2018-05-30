import React from 'react'
import * as actions from "../actions";
import {connect} from 'react-redux'


export const Heading = ({inPreviewMode, widget, headingSizeChanged, headingTextChanged}) => {
    let selectElem
    let inputElem
    return (
        <div>
            <div hidden={inPreviewMode}>
                <input
                    placeholder="Heading text"
                    ref={node => inputElem = node}
                    value={widget.text}
                    onChange={() => headingTextChanged(widget.id, inputElem.value)}/>
                <select
                    ref={node => selectElem = node}
                    onChange={() => headingSizeChanged(widget.id, selectElem.value)}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
            </div>

            <div>
                Preview
                {widget.size == 1 && <h1>{widget.text}</h1>}
                {widget.size == 2 && <h2>{widget.text}</h2>}
                {widget.size == 3 && <h3>{widget.text}</h3>}
            </div>
        </div>
    )
}

const headingDispatchMapper = dispatch => ({
    headingSizeChanged: (wid, size) => actions.headingSizeChanged(dispatch, wid, size),
    headingTextChanged: (wid, text) => actions.headingTextChanged(dispatch, wid, text)
})

const headingStateMapper = state => ({
    inPreviewMode: state.preview
})

export const HeadingContainer = connect(headingStateMapper, headingDispatchMapper)(Heading)