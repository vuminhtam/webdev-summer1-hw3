let _singleton = Symbol();
const LOCAL_URL = 'http://localhost:8080'
const WIDGET_API = LOCAL_URL + '/api/widget'

export default
class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    //init the service class
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new WidgetService(_singleton);
        return this[_singleton]
    }

    findAllWidgets() {
        return fetch(WIDGET_API)
            .then(response => (response.json()))
    }
}
