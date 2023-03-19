import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { isCell, matrix, shouldResize } from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '../../core/Dom'

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
        } else if (isCell(event)) {
            const $target = $(event.target)
            if(event.shiftKey) {
                const $cells =  matrix($target, this.selection.current).map (id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

}