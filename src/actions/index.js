import * as constants from "../constants";
import WidgetService from "../service/widgetService";

const widgetService = WidgetService.instance
export const findAllWidgets = dispatch => {
    widgetService.findAllWidgets()
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: sortWidget(widgets)}))
}

export const findAllWidgetsByLessonID = (lid, dispatch) => {
    widgetService.findAllWidgetsByTopicID(lid)
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: sortWidget(widgets)}))
}

export const sortWidget = (widgets) => {
    return widgets.sort(function(a,b) {return a.widget_order - b.widget_order})
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

export const headingTextChanged = (dispatch, wid, newText) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: wid,
        text: newText})
)

export const preview = dispatch => {
    dispatch({type: constants.PREVIEW})
}

export const renderImgURL = (dispatch, id, url) => {
    return(
        dispatch({
        type: constants.RENDER_IMG_URL,
        id: id,
        href: url}))
}

export const listTypeChanged = (dispatch, id, newType) => (
    dispatch({
        type: constants.LIST_TYPE_CHANGED,
        id: id,
        listType: newType})
)