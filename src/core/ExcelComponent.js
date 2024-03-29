import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
    
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name ?? ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe ?? []
        this.store = options.store
        this.unsubscribers = []
        this.prepare()
    }
    
    // Настраиваем наш компонент до init
    prepare() {}
    
    // возвращает шаблон компонента
    toHtml () {
        return ''
    }
    
    // уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.dispatch(event, ...args)
    }
    
    // Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }
    
    $dispatch(action) {
        this.store.dispatch(action)
    }
    
    // Сюда приходят изменения только после изменения стора
    storeChanged() {}
    
    isWatching(key) {
        return this.subscribe.includes(key)
    }
    
    // Инициализируме компонент
    // Добавляем DOM слушателей
    init() {
        this.initDOMListeners()
    }
    
    // Удаляем компонент
    // Чистим слушатели
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach( unsub => unsub())
    }
}