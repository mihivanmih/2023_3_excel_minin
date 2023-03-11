import { capitalize } from './utils'

export class DomListener {
    constructor($root, listeners = []) {
        if(!$root){
            throw new Error('Нет app')
        }
        this.$root = $root
        this.listeners = listeners
    }
    
    initDOMListeners() {
        this.listeners.forEach( listener => {
            
            const method = getMethodName(listener)
            if(!this[method]) {
                throw new Error(method+' method не найден в компоненте '+  this.name)
            }
            
            this.$root.on(listener, this[method].bind(this))
        })
    }
    
    removeDOMListeners() {
    
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}