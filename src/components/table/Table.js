import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { isCell, matrix, shouldResize } from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '../../core/Dom'
import { nextSelector } from '../../core/utils'
import * as actions from '../../redux/actions'
import { defaultStyles } from '../../constants'

export class Table extends ExcelComponent {
    
    static className = 'excel__table'
    
    constructor($root, options) {
        super($root, {
            name: 'Table',
            ...options,
            listeners: ['mousedown', 'keydown', 'input']
        })
    }
    
    toHtml () {
        return createTable(20, this.store.getState())
    }
    
    prepare() {
        this.selection = new TableSelection()
    }
    
    init() {
        super.init()
        
        this.selectCell(this.$root.find('[data-id="0_0"]'))
        
        this.$on('formula_input', text => {
            this.selection.current.text(text)
            this.updateTextInStore(text)
        })
        
        this.$on('formula_down', () => {
            this.selection.current.focus()
        })
    
        this.$on('toolbar_applyStyle', (style) => {
            this.selection.applyStyle(style)
        })
        
        // this.$subscribe( state => {
        //
        // })
    }
    
    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table_select', $cell)
        
        const styles =  $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
        
       
    }
    
    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.log('resizeTable', e)
        }
    }

    onMousedown(event) {
        if(shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if(event.shiftKey) {
                const $cells =  matrix($target, this.selection.current).map (id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
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
            this.selectCell($next)
        }
    }
    
    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value: value
        }))
    }
    
    onInput(event) {
       // this.$emit('table_input', $(event.target))
        this.updateTextInStore($(event.target).text())
    }

}