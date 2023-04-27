import { Page } from '../src/core/page/Page'
import { createStore } from '../src/core/store/createStore'
import { rootReduser } from '../src/redux/rootReduser'
import { normalizeInitialState } from '../src/redux/initialState'
import { Header } from '../src/components/header/Header'
import { Toolbar } from '../src/components/toolbar/Toolbar'
import { Formula } from '../src/components/formula/Formula'
import { Table } from '../src/components/table/Table'
import { Excel } from '../src/components/excel/Excel'
import { StateProcessor } from '../src/core/page/StateProcessor'
import { LocalStorageClient } from '../src/shared/LocalStorageClient'

export class ExcelPage extends Page{
    
    constructor(param) {
        super(param)
        
        this.storSub = null
        this.processor = new StateProcessor(
            new LocalStorageClient(this.params)
        )
    }
    
    async getRoot() {
        
        //const params = this.params //? this.params : Date.now().toString()
        
        // const state = storage(storageName(params))
        const state =  await this.processor.get()
        const store = createStore(rootReduser, normalizeInitialState(state))

        // const stateListener = debounce(state => {
        //     storage(storageName(params), state)
        // }, 300)
        
        this.storeSub = store.subscribe(this.processor.listen)

        this.excel = new Excel( {
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }
    
    afterRender() {
        this.excel.init()
    }
    
    destroy() {
        this.excel.destroy()
        this.storeSub.unsubscribe()
    }
}