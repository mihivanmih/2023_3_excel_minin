import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize } from './table.functions'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
    
    static className = 'excel__table'
    
    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }
    
    toHtml () {
        return createTable()
    }
    
    prepare() {
        this.selection = new TableSelection()
    }
    
    init() {
        super.init()
        this.selection = new TableSelection()
        const $cell = this.$root.find('[data-id="0_0"]')
        this.selection.select($cell)
    }

    onMousedown(event) {
        if(shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
    }

}