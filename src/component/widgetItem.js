import React from 'react'
import {DELETE_WIDGET, SELECT_WIDGET_TYPE} from "../constants";
import {connect} from 'react-redux'
import {HEADING, IMAGE, LIST, PARAGRAPH} from "../constants/widgetType";
import {HeadingContainer} from "../component/headingWidget"
import {ParagraphContainer} from "../component/paragraph"
import {List} from "../component/listWidget"
import {ImageContainer} from "../component/imageWidget"



export const WidgetItem = ({inPreviewMode, widget, dispatch}) => {
    let selectElement
    return (
        <div>
        <li>
            <div hidden={inPreviewMode}>
                {widget.widgetType} widget
                <select
                    value={widget.widgetType}
                    ref={node => selectElement = node}
                    onChange={e => (
                        dispatch(
                            {
                                type: SELECT_WIDGET_TYPE,
                                id: widget.id,
                                widgetType: selectElement.value
                            }))}>
                    <option>Heading</option>
                    <option>Paragraph</option>
                    <option>List</option>
                    <option>Image</option>
                </select>
                <button onClick={e => (
                    dispatch(
                        {
                            type: DELETE_WIDGET,
                            id: widget.id
                        })
                )}>Delete
                </button>
            </div>

            <div>
                {widget.widgetType=== HEADING && <HeadingContainer widget={widget}/>}
                {widget.widgetType=== PARAGRAPH && <ParagraphContainer widget={widget}/>}
                {widget.widgetType=== LIST && <List/>}
                {widget.widgetType=== IMAGE && <ImageContainer widget={widget}/>}
            </div>
        </li>
    </div>
    )
}

const widgetStateMapper = (state) => (
    {inPreviewMode: state.preview}
)

export const WidgetContainer = connect(widgetStateMapper)(WidgetItem)
