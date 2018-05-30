import React from 'react'
import {DELETE_WIDGET, SELECT_EDIT, SELECT_WIDGET_TYPE} from "../constants";
import {connect} from 'react-redux'
import {HEADING, IMAGE, LINKTEXT, LIST, PARAGRAPH} from "../constants/widgetType";
import {HeadingContainer} from "../component/headingWidget"
import {ParagraphContainer} from "../component/paragraph"
import {ListContainer} from "../component/listWidget"
import {ImageContainer} from "../component/imageWidget"
import {LinkTextContainer} from "./linkText";


export const WidgetItem = ({inPreviewMode, editingWidget, widget, dispatch}) => {
    let selectElement
    return (
        <div className="card bg-light mb-3">
        <li>
            <div class="text-right">
                {widget.widget_order}
                <button
                    hidden={!(inPreviewMode || (editingWidget != null && widget.id != editingWidget))}
                    className="btn btn-warning"
                    onClick={e => (
                    dispatch(
                        {type: SELECT_EDIT, id: widget.id})
                )}> <i className="fas fa-pencil-alt"></i>
                </button>
                <button
                    className="btn btn-danger"
                    onClick={e => (
                        dispatch({type: DELETE_WIDGET, id: widget.id})
                    )}><i className="fas fa-times"></i>
                </button>

            </div>
            <div hidden={inPreviewMode || (editingWidget != null && widget.id != editingWidget)}>
                <select
                    value={widget.widgetType}
                    ref={node => selectElement = node}
                    onChange={e => (
                        dispatch(
                            {type: SELECT_WIDGET_TYPE, id: widget.id, widgetType: selectElement.value
                            }))}>
                    <option>{HEADING}</option>
                    <option>{PARAGRAPH}</option>
                    <option>{LIST}</option>
                    <option>{IMAGE}</option>
                    <option>{LINKTEXT}</option>
                </select>

                <div className="card-header">
                    <h5 >{widget.widgetType} widget</h5>
                </div>
            </div>

            <div className="card-body">
                {widget.widgetType=== HEADING && <HeadingContainer widget={widget}/>}
                {widget.widgetType=== PARAGRAPH && <ParagraphContainer widget={widget}/>}
                {widget.widgetType=== LIST && <ListContainer widget={widget}/>}
                {widget.widgetType=== IMAGE && <ImageContainer widget={widget}/>}
                {widget.widgetType=== LINKTEXT && <LinkTextContainer widget={widget}/>}
            </div>
        </li>
    </div>
    )
}

export const stateMapper = (state) => (
    {inPreviewMode: state.preview,
    editingWidget: state.editingWidget}
)

export const WidgetContainer = connect(stateMapper)(WidgetItem)
