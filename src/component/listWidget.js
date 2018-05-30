import React from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'

export const List = ({inPreviewMode, widget, textChanged}) => {
    let inputElem
    return (
        <div>
            <div>
                <textarea
                    placeholder="Enter one list item per line"
                    ref={node => inputElem = node}
                    defaultValue={widget.text}
                    onChange={() => textChanged(widget.id, inputElem.value)}></textarea>
            </div>

            <ol>
                {textToHTML(widget.text)}
            </ol>
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
    textChanged: (id, text) => actions.headingTextChanged(dispatch, id, text)
})

const stateMapper = state => ({
    inPreviewMode: state.preview
})

export const ListContainer = connect(stateMapper, dispatchMapper)(List)