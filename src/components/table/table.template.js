const CODES = {
    A: 65,
    Z: 90
}

const createCell = (col, index) => {
    return `
        <div class="cell" contenteditable="" data-col="${index}" data-id="${col}_${index}">
        </div>
    `
}

const createCol = (content, index) => {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

const createRow = (index, content) => {
    
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

const toChar = (index) => {
    return String.fromCharCode(CODES.A + index)
}

export const createTable = (rowsCount = 25) => {
    
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    
    const cols = new Array(colsCount)
        .fill('')
        .map((el, index) => {
            return toChar(index)
        })
        .map((el, index) => {
            return createCol(el, index)
        })
        .join('')
    
    rows.push(createRow(null, cols))
    for(let i = 0; i < rowsCount; i++){
        const cells = new Array(colsCount)
            .fill('')
            .map((col, index) => {
                return createCell(i, index)
            })
            .join('')
        rows.push(createRow(i + 1, cells))
    }
    
    return rows.join(' ')
}