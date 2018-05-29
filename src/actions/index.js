import * as constants from "../constants";
import WidgetService from "../service/widgetService";

const widgetService = WidgetService.instance
export const findAllWidgets = dispatch => {
    widgetService.findAllWidgets()
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets }))
}

export const addWidget = dispatch => {
    dispatch({type: constants.ADD_WIDGET})
}

export const save = dispatch => {
    dispatch({type: constants.SAVE})
}

export const headingSizeChanged = (dispatch, wid, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: wid,
        size: newSize})
)