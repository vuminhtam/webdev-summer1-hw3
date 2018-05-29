import {ADD_WIDGET, DELETE_WIDGET, FIND_ALL_WIDGETS, SAVE, SELECT_WIDGET_TYPE} from "../constants";
import WidgetService from "../service/widgetService";
import {PARAGRAPH} from "../constants/widgetType";

let initialState = {widgets: []}

const widgetService = WidgetService.instance

export const widgetReducer = (state = initialState, action) => {
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
                        text: 'New widget',
                        widgetType: PARAGRAPH
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

        default:
            return state
    }
}