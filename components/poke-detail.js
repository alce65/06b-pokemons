import { Component } from './component.js';

export class PokeDetail extends Component {
    pokeId;
    #template;
    constructor(selector) {
        super();
        this.pokeId = Number(location.search.split('=')[1]);
        this.#template = this.#createTemplate();
        this.render(selector, this.#template);
    }

    #createTemplate() {
        let template = `
            <h2>Detalles</h2>
            <div class="poke-detail">`;
        template += `<p>Pokemon ${this.pokeId}</p>`;
        template += `</div>`;
        return template;
    }
}
