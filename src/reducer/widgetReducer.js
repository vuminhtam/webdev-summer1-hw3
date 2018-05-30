import {
    ADD_WIDGET,
    DELETE_WIDGET,
    FIND_ALL_WIDGETS,
    HEADING_SIZE_CHANGED, HEADING_TEXT_CHANGED, PREVIEW,
    SAVE,
    SELECT_WIDGET_TYPE, RENDER_IMG_URL, DEFAULT_IMG_URL, LIST_TYPE_CHANGED, SELECT_EDIT
} from "../constants";
import WidgetService from "../service/widgetService";
import {HEADING, PARAGRAPH, UNORDERED_LIST} from "../constants/widgetType";

let initialState = {widgets: [], preview: false}

const widgetService = WidgetService.instance

export const widgetReducer = (state = initialState, action) => {
    let cloneState
    switch (action.type) {
        case FIND_ALL_WIDGETS:
            return {
                widgets: action.widgets
            }
        case ADD_WIDGET:
            return {
                widgets : [
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        text: '',
                        widgetType: HEADING,
                        size: 1,
                        listType: UNORDERED_LIST
                    }
                ]
            }
        case DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }
        case SAVE:
            widgetService.save(state.widgets)
            return state
        case SELECT_WIDGET_TYPE:
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState))

        case HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            }

        case HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case PREVIEW:
            cloneState = Object.assign({}, state)
            cloneState.preview = !state.preview
            return cloneState

        case RENDER_IMG_URL:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.href = action.href
                    }
                    return Object.assign({}, widget)
                })
            }

        case LIST_TYPE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            }

        case SELECT_EDIT:
            cloneState = Object.assign({}, state)
            cloneState.editingWidget = action.id
            return cloneState
        default:
            return state
    }
}