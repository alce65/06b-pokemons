import { Component } from './component.js';
import { PokeList } from './poke-list.js';

export class MyPokeList extends Component {
    #template;
    #state;
    constructor(selector, state) {
        super();
        this.#state = state;
        this.#template = this.#createTemplate();
        this.render(selector, this.#template);
        new PokeList('.my-poke-list__list', this.#state.favorites, state);
    }

    #createTemplate() {
        let template = `
            <h2>Pokemons favoritos</h2>
            <div class="my-poke-list">`;
        template += `<ul class="my-poke-list__list"></ul>`;
        template += `</div>`;
        return template;
    }
}
