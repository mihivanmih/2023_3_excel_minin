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
    
    clear() {
        this.html('')
        return this
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