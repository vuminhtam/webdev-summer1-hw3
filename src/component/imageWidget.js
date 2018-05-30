import React from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'
import {WIDTH} from "../constants";

export const Image = ({inPreviewMode, editingWidget, widget, renderImgURL}) => {
    let inputElem
    return (
        <div>
            <div hidden={inPreviewMode || (editingWidget != null && widget.id != editingWidget)}>
                <input
                placeholder="Image URL"
                ref={node => inputElem = node}
                defaultValue={widget.href}/>
                <button onClick={() => renderImgURL(widget.id, inputElem.value)}>Render</button>
            </div>

            <div class="card-footer text-muted">
                Preview image
                <br/>
                <img src={widget.href}
                     alt="Your image preview" width={WIDTH}></img>
            </div>


        </div>
    )
}

const dispatchMapper = dispatch => ({
    renderImgURL: (id, url) => actions.renderImgURL(dispatch, id, url)
})

const stateMapper = (state) => (
    {inPreviewMode: state.preview, editingWidget: state.editingWidget}
)

export const ImageContainer = connect(stateMapper, dispatchMapper)(Image)