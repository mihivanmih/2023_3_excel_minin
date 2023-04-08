import { defaultStyles } from '../../constants'
import { camelToDashCase } from '../../core/utils'

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const createCell = (state, row) => {
    return function (_, col) {
        const id = `${ row }_${ col }`
        const width = getWidth(state.colState, col)
        const text = state.dataState[id]
        const styles = Object.keys(defaultStyles)
            .map(key => `${camelToDashCase(key)}: ${defaultStyles[key]}`)
            .join(';')
        
        
        return `
          <div
            class="cell"
            contenteditable
            data-col="${ col }"
            data-type="cell"
            data-id="${id}"
            style="${styles}; width: ${ width }"
          >${text ?? ''}</div>
    `
    }
}

const createCol = (content, index, width) => {
    return `
        <div class="column" data-type="resizable" data-col="${ index }" style="width: ${ width }">
            ${ content }
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

const createRow = (index, content, state) => {
    
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    const height = getHeight(state, index)
    return `
        <div
        class="row"
        data-type="resizable"
        data-row="${ index }"
        style="height: ${ height }"
        >
            <div class="row-info">
                ${ index ? index : '' }
                ${ resize }
            </div>
            <div class="row-data">${ content }</div>
        </div>
    `
}

const toChar = (index) => {
    return String.fromCharCode(CODES.A + index)
}

function getWidth(state, index) {
    return state[index] + 'px' ?? DEFAULT_WIDTH + 'px'
}

function getHeight(state, index) {
    return state[index] + 'px' ?? DEFAULT_HEIGHT + 'px'
}

export const createTable = (rowsCount = 25, state = {}) => {
    
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    
    const cols = new Array(colsCount)
        .fill('')
        .map((el, index) => {
            return toChar(index)
        })
        .map((el, index) => {
            const width = getWidth(state.colState, index)
            return createCol(el, index, width)
        })
        .join('')
    
    rows.push(createRow(null, cols, {}))
    
    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(state, i))
            .join('')
        rows.push(createRow(i + 1, cells, state.rowState))
    }
    
    return rows.join(' ')
}