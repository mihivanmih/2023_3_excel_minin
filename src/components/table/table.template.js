const CODES = {
    A: 65,
    Z: 90
}



const createCell = (col) => {
    return `
        <div class="cell selected" contenteditable="">
            ${col}
        </div>
    `
}
const createCol = (content) => {
    return `
        <div class="column">
            ${content}
        </div>
    `
}

const createRow = (content) => {
    return `
        <div class="row">
            <div class="row-info"></div>
            <div class="row-data">${content}</div>
        </div>
    `
}

const toChar = (index) => {
    return String.fromCharCode(CODES.A + index)
}

export const createTable = (rowsCount = 150) => {
    
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    
    const cols = new Array(colsCount)
        .fill('')
        .map((el, index) => {
            return toChar(index)
        })
        .map(el => {
            return createCol(el)
        })
        .join('')
    
    rows.push(createRow(cols))
    for(let i = 0; i < rowsCount; i++){
        rows.push(createRow())
    }
    
    return rows.join(' ')
}