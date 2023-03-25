export function createStore(rootReduser, initialState = {}) {
    
    let state = rootReduser({ ...initialState }, { type: '__INIT__' })
    let listeners = []
    
    return {
        subscribe(fn) {
            listeners.push(fn)
            return {
                unsubscribe() {
                    listeners = listeners.filter(l => l !== fn)
                }
            }
        },
        dispatch(action) {
            state = rootReduser(state, action)
            listeners.forEach(listener => listener(state))
        },
        getState() {
            return state
        }
    }
}