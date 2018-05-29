import React from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'

export const Paragraph = () => (
    <div>
        <h2>Paragraph</h2>
        <textarea></textarea>
    </div>
)

export const Image = () => (
    <h2>Image</h2>
)

export const List = () => (
    <h2>List</h2>
)

export const Heading = ({widget, headingSizeChanged}) => {
    let selectElem
    return (
        <div>
            <h2>Heading {widget.size}</h2>
            <select
                ref={node => selectElem = node}
                onChange={() => headingSizeChanged(widget.id, selectElem.value)}>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
            </select>

        </div>
    )
}

const headingDispatchMapper = dispatch => ({
    headingSizeChanged: (wid, size) => actions.headingSizeChanged(dispatch, wid, size)
})

const headingStateMapper = state => ({

})

export const HeadingContainer = connect(headingStateMapper, headingDispatchMapper)(Heading)