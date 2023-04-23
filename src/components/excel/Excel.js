import { $ } from '../../core/Dom'
import { Emitter } from '../../core/Emitter'
import { StoreSubscriber } from '../../core/StoreSubscriber'
import { updateDate } from '../../redux/actions'
import { preventDefault } from '../../core/utils'

export class Excel {
    constructor(options) {
        this.components = options.components ?? []
        this.store = options.store
        this.emitter = new Emitter()
        this.subscriber = new StoreSubscriber(this.store)
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
    
    init() {
        // eslint-disable-next-line no-undef
        if(process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }
        this.store.dispatch(updateDate())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach( component => {
            component.init()
        })
    }
    
    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach( component => component.destroy())
        document.removeEventListener('contextmenu', preventDefault)
    }
    
}