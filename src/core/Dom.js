class Dom {
    constructor(selector) {
        // #app
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
    }
    
    html(html) {
        if(typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }
    
    text(text) {
        if(typeof text === 'string') {
            this.$el.textContent = text
            return this
        }
        if(this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }
    
    clear() {
        this.html('')
        return this
    }
    
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }
    
    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }
    
    append(node) {
        if(Element.prototype.append) {
            if(node instanceof Dom) {
                node = node.$el
            }
            
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
    }
    
    get data() {
        return this.$el.dataset
    }
    
    closest(selector) {
        return $(this.$el.closest(selector))
    }
    
    getCoords() {
        return this.$el.getBoundingClientRect()
    }
    
    find(selector) {
        return $(this.$el.querySelector(selector))
    }
    
    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }
    
    css(styles = {}) {
        Object.keys(styles).forEach( key => {
            this.$el.style[key] = styles[key]
        })
    }
    
    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }
    
    id(parse) {
        if(parse) {
            const parsed = this.id().split('_')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }
    
    focus() {
        this.$el.focus()
        return this
    }
    
    addClass(className) {
        return this.$el.classList.add(className)
    }
    
    removeClass(className) {
        return this.$el.classList.remove(className)
    }
    
    attr(name, value) {
        if(value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }
    
    
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes ='') => {
    const el = document.createElement(tagName)
    if(classes) {
        el.classList.add(classes)
    }
    return $(el)
}

// $.html = (tagName, htmlText) => {
//     console.log("tagName", tagName.className)
//     console.log("htmlText", htmlText)
//     const html = document.querySelector(`.${tagName.className}`)
//     console.log("html", html)
//     return html.innerHTML = htmlText
// }