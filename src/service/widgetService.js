let _singleton = Symbol();
const REMOTE_URL = 'https://webdev-summer1-2018-tamvu.herokuapp.com'
const LOCAL_URL = 'http://localhost:8080'
const WIDGET_API = REMOTE_URL + '/api/widget'

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

    save(overrideList) {
        return fetch(WIDGET_API + '/save', {
            method: 'post',
            body: JSON.stringify(overrideList),
            headers: {
                'content-type': 'application/json'}
        }).then(() => alert('Changes saved!'))
    }
}
