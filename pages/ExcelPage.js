import { Page } from '../src/core/Page'
import { createStore } from '../src/core/store/createStore'
import { rootReduser } from '../src/redux/rootReduser'
import {  normalizeInitialState } from '../src/redux/initialState'
import { debounce, storage } from '../src/core/utils'
import { Header } from '../src/components/header/Header'
import { Toolbar } from '../src/components/toolbar/Toolbar'
import { Formula } from '../src/components/formula/Formula'
import { Table } from '../src/components/table/Table'
import { Excel } from '../src/components/excel/Excel'

function storageName(param) {
    return 'excel-' + param
}

export class ExcelPage extends Page{
    getRoot() {
        
        const params = this.params //? this.params : Date.now().toString()
        
        const state = storage(storageName(params))
        const store = createStore(rootReduser, normalizeInitialState(state))

        const stateListener = debounce(state => {
            storage(storageName(params), state)
        }, 300)

        store.subscribe(stateListener)

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
    }
}