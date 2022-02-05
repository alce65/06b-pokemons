import { Component } from './component.js';

export class PokeList extends Component {
    #template;
    constructor(selector) {
        super();
        this.#template = this.#createTemplate();
        this.render(selector, this.#template);
    }

    #createTemplate() {
        let template = `
            <h2>Lista de Pokemos</h2>
            <div class="poke-list">`;
        template += `
        <a class="poke-item__link" href='./detail.html?id=1'>un pokemon</a>
        `;
        template += `</div>`;
        return template;
    }
}
