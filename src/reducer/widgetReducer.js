import {
    ADD_WIDGET,
    DELETE_WIDGET,
    FIND_ALL_WIDGETS,
    HEADING_SIZE_CHANGED,
    HEADING_TEXT_CHANGED,
    PREVIEW,
    SAVE,
    SELECT_WIDGET_TYPE,
    RENDER_IMG_URL,
    DEFAULT_IMG_URL,
    LIST_TYPE_CHANGED,
    SELECT_EDIT,
    MOVE_WIDGET_UP,
    MOVE_WIDGET_DOWN
} from "../constants";
import WidgetService from "../service/widgetService";
import {HEADING, PARAGRAPH, UNORDERED_LIST} from "../constants/widgetType";

let initialState = {widgets: [], preview: true, editingWidget: null}

const widgetService = WidgetService.instance

export const widgetReducer = (state = initialState, action) => {
    let cloneState = Object.assign({}, state)
    let newWidgets
    switch (action.type) {
        case FIND_ALL_WIDGETS:
            cloneState.widgets = action.widgets
            return cloneState
        case ADD_WIDGET:
            var newId = state.widgets.length + 1
            newWidgets =[
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        text: '',
                        widgetType: HEADING,
                        size: 1,
                        listType: UNORDERED_LIST,
                        widget_order: state.widgets.length + 1
                    }
                ]
            cloneState.widgets = newWidgets
            cloneState.preview = false
            cloneState.editingWidget = newId
            return cloneState
        case DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }

        case SAVE:
            var order = 0;
            state.widgets.map((widget) => {
                widget.widget_order = order;
                order = order + 1;
            })
            widgetService.save(state.widgets)
            return state

        case SELECT_WIDGET_TYPE:
            console.log(action.widgetType)
            newWidgets = state.widgets.filter((widget) => {
                if(widget.id === action.id) {
                    widget.widgetType = action.widgetType
                }
                return true;
            })
            cloneState.widgets = newWidgets
            return JSON.parse(JSON.stringify(cloneState))

        case HEADING_SIZE_CHANGED:
            newWidgets = state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            cloneState.widgets = newWidgets
            return cloneState


        case HEADING_TEXT_CHANGED:
            newWidgets = state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            cloneState.widgets = newWidgets
            return cloneState

        case PREVIEW:
            cloneState.preview = !state.preview
            return cloneState

        case RENDER_IMG_URL:
           newWidgets = state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.href = action.href
                    }
                    return Object.assign({}, widget)
                })
            cloneState.widgets = newWidgets
            return cloneState

        case LIST_TYPE_CHANGED:
            newWidgets = state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            cloneState.widgets = newWidgets
            return cloneState

        case SELECT_EDIT:
            cloneState.editingWidget = action.id
            cloneState.preview = false
            return cloneState

        case MOVE_WIDGET_UP:
            newWidgets = cloneState.widgets
            if(action.order > 0) {
                swap(newWidgets, action.order, action.order - 1)
            }
            cloneState.widgets = newWidgets
            return JSON.parse(JSON.stringify(cloneState))

        case MOVE_WIDGET_DOWN:
            newWidgets = cloneState.widgets
            if(action.order < newWidgets.length - 1) {
                swap(newWidgets, action.order, action.order + 1)
            }
            cloneState.widgets = newWidgets
            return JSON.parse(JSON.stringify(cloneState))


        default:
            return state
    }
}

const swap = (v, i, j) => {
    var temp = v[i]
    v[i] = v[j]
    v[i].widget_order = i
    v[j] = temp
    v[j].widget_order = j
    return v
}