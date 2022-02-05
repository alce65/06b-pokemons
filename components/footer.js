import { Component } from './component.js';

export class Footer extends Component {
    #template;
    constructor(selector, author = 'Alejandro Cerezo', brand = 'ISDI Coders') {
        super();
        this.#template = this.#createTemplate(author, brand);
        this.render(selector, this.#template);
    }
    #createTemplate(author, brand) {
        return `
            <footer>
                <address>${author} - ${brand}</address>
            </footer>
            `;
    }
}
