import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '../../core/Dom'

export class Formula extends ExcelComponent {
    
    static className = 'excel__formula'
    
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }
    
    toHtml () {
        return `<div class="info">fx</div>
                <div class="input" contenteditable spellcheck="false"></div>
        `
    }
    
    onInput(event) {
        this.$emit('formula_input', $(event.target).text())
    }
    
    onKeydown(event) {
        if(event.key === 'Enter') {
            event.preventDefault()
            
            this.$emit('formula_down')
        }
    }
}