import {ADD_WIDGET, FIND_ALL_WIDGETS, SAVE} from "../constants";
import WidgetService from "../service/widgetService";

const widgetService = WidgetService.instance
export const findAllWidgets = dispatch => {
    widgetService.findAllWidgets()
        .then(widgets => dispatch({
            type: FIND_ALL_WIDGETS,
            widgets: widgets }))
}

export const addWidget = dispatch => (
    dispatch({type: ADD_WIDGET})
)

export const save = dispatch => (
    dispatch({type: SAVE})
)