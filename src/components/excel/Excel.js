import { $ } from '../../core/Dom'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components ?? []
    }
    
    getRoot() {
        const $root = $.create('div', 'excel')
        //  const $root = document.createElement('div')
        //  $root.classList.add('excel')
    
        this.components = this.components.map( component => {
            // const $el = document.createElement('div')
            //$el.classList.add(component.className)
            const $el = $.create('div', component.className)
            
            const componentOne = new component($el)
            //$.html($el, componentOne.toHtml())
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
    
}