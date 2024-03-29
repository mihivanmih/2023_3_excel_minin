import { isEqueal } from './utils'

export class StoreSubscriber {
    constructor(store) {
        this.store  = store
        this.sub = null
        this.prevState = {}
    }
    
    subscribeComponents(components) {
        this.prevState = this.store.getState()
        
        this.sub = this.store.subscribe( state => {
            Object.keys(state).forEach( key => {
                if(!isEqueal(this.prevState[key], state[key])) {
                    components.forEach( component => {
                        if(component.isWatching(key)) {
                            const changes = { [key]: state[key] }
                            component.storeChanged(changes)
                        }
                    })
                }
            })
            
            this.prevState = this.store.getState()
    
            // eslint-disable-next-line no-undef
            if(process.env.NODE_ENV === 'development') {
                window['ewdux'] = this.prevState
            }
        })
    }
    
    unsubscribeFromStore() {
        this.sub.unsubscribe()
    }
}