import { $ } from '../../core/Dom'
import { Emitter } from '../../core/Emitter'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components ?? []
        this.store = options.store
        this.emitter = new Emitter()
    }
    
    getRoot() {
        const $root = $.create('div', 'excel')
        
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }
    
        this.components = this.components.map( component => {
            const $el = $.create('div', component.className)
            
            const componentOne = new component($el, componentOptions)
            
            $el.html(componentOne.toHtml())
            $root.append($el)
            return componentOne
        })
        
        return $root
    }
    
    render() {
        this.$el.append(this.getRoot())
        this.components.forEach( component => {
            component.init()
        })
    }
    
    destroy() {
        this.components.forEach( component => component.destroy())
    }
    
}