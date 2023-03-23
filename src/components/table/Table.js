import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { isCell, matrix, shouldResize } from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '../../core/Dom'
import { nextSelector } from '../../core/utils'

export class Table extends ExcelComponent {
    
    static className = 'excel__table'
    
    constructor($root, options) {
        super($root, {
            name: 'Table',
            ...options,
            listeners: ['mousedown', 'keydown']
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
        
        this.$on('formula_input', text => {
            this.selection.current.text(text)
        })
        
        this.$on('formula_down', () => {
            this.selection.current.focus()
        })
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
    
    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
        
        const {key} = event
        
        if(keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selection.select($next)
        }
    }

}