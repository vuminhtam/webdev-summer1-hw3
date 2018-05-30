import React from 'react'
import {
    DELETE_WIDGET,
    MOVE_WIDGET_DOWN,
    MOVE_WIDGET_UP, SAVE,
    SELECT_EDIT,
    SELECT_WIDGET_TYPE,
    WIDGET_NAME_CHANGED
} from "../constants";
import {connect} from 'react-redux'
import {HEADING, IMAGE, LINKTEXT, LIST, PARAGRAPH} from "../constants/widgetType";
import {HeadingContainer} from "../component/headingWidget"
import {ParagraphContainer} from "../component/paragraph"
import {ListContainer} from "../component/listWidget"
import {ImageContainer} from "../component/imageWidget"
import {LinkTextContainer} from "./linkText";


export const WidgetItem = ({inPreviewMode, editingWidget, widget, dispatch}) => {
    let selectElement
    let widgetName = widget.name
    let inputName
    return (
        <div title={widgetName}
            className={setBorder(inPreviewMode, editingWidget, widget)}>
            <caption> [{widget.widgetType}] {widgetName}</caption>
            <li>
            <div class="text-right" role="toolbar">
                <button
                    hidden={!(inPreviewMode || (editingWidget != null && widget.id != editingWidget))}
                    className="btn btn-warning"
                    onClick={e => (
                    dispatch(
                        {type: SELECT_EDIT, id: widget.id})
                )}> <i className="fas fa-pencil-alt"></i>
                </button>

                <div className="input-group mb-3"
                     hidden={(inPreviewMode || (editingWidget != null && widget.id != editingWidget))}>

                    <button
                        className="btn btn-light"
                        hidden={(inPreviewMode || (editingWidget != null && widget.id != editingWidget))}
                        onClick={e => (
                            dispatch(
                                {type: MOVE_WIDGET_UP, id: widget.id, order: widget.widget_order})
                        )}><i className="fas fa-arrow-circle-up"></i>
                    </button>

                    <button
                        className="btn btn-light"
                        hidden={(inPreviewMode || (editingWidget != null && widget.id != editingWidget))}
                        onClick={e => (
                            dispatch(
                                {type: MOVE_WIDGET_DOWN, id: widget.id, order: widget.widget_order})
                        )}><i className="fas fa-arrow-circle-down"></i>
                    </button>
                    <select
                    className="custom-select"
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
                    <div className="input-group-append">
                    <label
                        className="input-group-text" htmlFor="widgetNameInput">
                        Name
                    </label>
                        <input
                            className="widgetNameInput"
                            ref={node => inputName = node}
                            onChange={e => (
                                dispatch(
                                    {type: WIDGET_NAME_CHANGED, id: widget.id, name: inputName.value})
                            )}
                            type="text"
                            className="form-control"
                            defaultValue={widgetName}>
                        </input>
                    </div>

                    <div
                        hidden={(inPreviewMode || (editingWidget != null && widget.id != editingWidget))}>
                        <button className="btn btn-success"
                                onClick={e => (
                                    dispatch(
                                        {type: SAVE})
                                )}>
                            <i className="far fa-save"></i>
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={e => (
                                dispatch({type: DELETE_WIDGET, id: widget.id})
                            )}><i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>



            </div>
            <div hidden={inPreviewMode || (editingWidget != null && widget.id != editingWidget)}>

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

const setBorder = (inPreviewMode, editingWidget, widget) => {
    if(inPreviewMode || (editingWidget != null && widget.id != editingWidget)) {
        return "card mb-3"
    } else {
        return "card mb-3 border-left-0 border-right-0 border-secondary"
    }
}

export const stateMapper = (state) => (
    {inPreviewMode: state.preview,
    editingWidget: state.editingWidget}
)

export const WidgetContainer = connect(stateMapper)(WidgetItem)
