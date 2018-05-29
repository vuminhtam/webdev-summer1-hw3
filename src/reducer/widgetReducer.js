import {ADD_WIDGET, DELETE_WIDGET, FIND_ALL_WIDGETS, SAVE} from "../constants";
import WidgetService from "../service/widgetService";

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
                    {text: 'New widget'}
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
        default:
            return state
    }
}