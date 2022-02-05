import { Component } from './component.js';

export class Basic extends Component {
    #template;
    constructor(selector) {
        super();
        this.#template = this.#createTemplate();
        this.render(selector, this.#template);
    }

    #createTemplate() {
        let template = `
            <h2>Basic</h2>
            <div class="basic">`;
        template += `</div>`;
        return template;
    }
}
