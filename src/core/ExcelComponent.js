import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
    
    constructor($root, options = {}) {
        super($root, options.listeners)
    }
    
    // возвращает шаблон компонента
    toHtml () {
        return ''
    }
    
    init() {
        this.initDOMListeners()
    }
}