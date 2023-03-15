import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
    
    static className = 'excel__table'
    
    constructor($root) {
        super($root, {
        //    listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
        })
    }
    
    toHtml () {
        return createTable()
    }
    
    // onClick() {
    //     console.log('click')
    // }
    //
    // onMousedown(event) {
    //     console.log('onMousedown', event.target)
    // }
    //
    // onMousemove() {
    //     console.log('mousemove')
    // }
    // onMouseup() {
    //     console.log('onMouseup')
    // }

}