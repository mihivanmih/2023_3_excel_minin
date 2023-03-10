export class DomListener {
    constructor($root, listeners = []) {
        if(!$root){
            throw new Error('Нет app')
        }
        this.$root = $root
        this.listeners = listeners
    }
    
    initDOMListeners() {
        console.log(this.listeners)
    }
    
    removeDOMListeners() {
    
    }
}