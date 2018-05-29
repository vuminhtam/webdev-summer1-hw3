import React from 'react'
import {DELETE_WIDGET, SELECT_WIDGET_TYPE} from "../constants";
import {connect} from 'react-redux'
import {HEADING, IMAGE, LIST, PARAGRAPH} from "../constants/widgetType";
import {Heading, Paragraph, Image, List} from "../component/widgetCmpType"

export const WidgetItem = ({widget, dispatch}) => {
    let selectElement
    return (
        <div>
        <li>
            {widget.widgetType}
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
            <div>
                {widget.widgetType=== HEADING && <Heading/>}
                {widget.widgetType=== PARAGRAPH && <Paragraph/>}
                {widget.widgetType=== LIST && <List/>}
                {widget.widgetType=== IMAGE && <Image/>}
            </div>
        </li>
    </div>
    )
}

export const WidgetContainer = connect()(WidgetItem)
