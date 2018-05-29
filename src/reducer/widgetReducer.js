import {ADD_WIDGET, DELETE_WIDGET, FIND_ALL_WIDGETS} from "../constants";

let initialState = {widgets: []}

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
        default:
            return state
    }
}