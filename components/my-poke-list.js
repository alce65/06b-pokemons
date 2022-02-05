import { Component } from './component.js';

export class MyPokeList extends Component {
    #template;
    constructor(selector) {
        super();
        this.#template = this.#createTemplate();
        this.render(selector, this.#template);
    }

    #createTemplate() {
        let template = `
            <h2>Pokemons favoritos</h2>
            <div class="my-poke-list">`;
        template += `
        <a class="poke-item__link" href='./detail.html?id=1'>un pokemon</a>
        `;
        template += `</div>`;
        return template;
    }
}
