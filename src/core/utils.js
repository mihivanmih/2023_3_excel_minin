export function capitalize (string) {
    if(typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
    if(start > end) {
        [end, start] = [start, end]
    }
    return new Array( end - start + 1)
        .fill('')
        .map((_, index) => {
            return start + index
        })
}

export function nextSelector(key, { col, row }) {
    const MIN_VALUE = 0
    switch (key) {
    case 'Enter':
    case 'ArrowDown':
        row++
        break
    case 'Tab':
    case 'ArrowRight':
        col++
        break
    case 'ArrowLeft':
        col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
        break
    case 'ArrowUp':
        row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
        break
    }
    
    return `[data-id="${row}_${col}"]`
}

export function storage(key, data = null) {
    if(!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export function isEqueal(a, b) {
    if(typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles( styles = {}) {
    return Object.keys(styles)
        .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
        .join(';')
}

export function debounce(fn, wait) {
    let timeout
    return function (...args) {
        
        const later = () => {
            clearTimeout(timeout)
            fn.apply(this, args)
            //fn(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout( later, wait)
    }
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export function preventDefault(event) {
    event.preventDefault()
}