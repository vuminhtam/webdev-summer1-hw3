import React from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'

export const LinkText = ({inPreviewMode, editingWidget, widget, renderImgURL, headingTextChanged}) => {
    let inputText
    let inputUrl
    return (
        <div>
            <div hidden={inPreviewMode || (editingWidget != null && widget.id != editingWidget)}>
                <input
                    placeholder="Link text"
                    ref={node => inputText = node}
                    defaultValue={widget.text}
                    onChange={() => headingTextChanged(widget.id, inputText.value)}/>
                <input
                    type="url"
                    placeholder="URL"
                    ref={node => inputUrl = node}
                    defaultValue={widget.href}
                    onChange={() => renderImgURL(widget.id, inputUrl.value)}/>
            </div>

            <div>
                Preview hyperlink text
                <br/>
                <a href={widget.href} target="_blank">{widget.text}</a>
            </div>


        </div>
    )
}

const dispatchMapper = dispatch => ({
    renderImgURL: (id, url) => actions.renderImgURL(dispatch, id, url),
    headingTextChanged: (wid, text) => actions.headingTextChanged(dispatch, wid, text)
})

const stateMapper = (state) => (
    {inPreviewMode: state.preview, editingWidget: state.editingWidget}
)

export const LinkTextContainer = connect(stateMapper, dispatchMapper)(LinkText)