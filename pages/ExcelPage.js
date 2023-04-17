import { Page } from '../src/core/Page'
import { createStore } from '../src/core/createStore'
import { rootReduser } from '../src/redux/rootReduser'
import { initialState } from '../src/redux/initialState'
import { debounce, storage } from '../src/core/utils'
import { Header } from '../src/components/header/Header'
import { Toolbar } from '../src/components/toolbar/Toolbar'
import { Formula } from '../src/components/formula/Formula'
import { Table } from '../src/components/table/Table'
import { Excel } from '../src/components/excel/Excel'

export class ExcelPage extends Page{
    getRoot() {
        const store = createStore(rootReduser, initialState)

        const stateListener = debounce(state => {
            console.log("state", state)
            storage('excel-state', state)
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