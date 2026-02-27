
class HelloWorld extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<p>Hello World</p>
            <h3>Hello ${this.getAttribute('name')}</h3>`
    }
}


customElements.define("hello-world",HelloWorld)