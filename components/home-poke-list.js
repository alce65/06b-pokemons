import { Component } from './component.js';
import { PokeList } from './poke-list.js';

export class HomePokeList extends Component {
    #template;
    #state;
    constructor(selector, state) {
        super();
        this.#state = state;
        this.#template = this.#createTemplate();
        this.render(selector, this.#template);
        new PokeList('.poke-list__list', state.pokeData, state);
    }

    #createTemplate() {
        const final = this.#state.nextUrl
            ? this.#state.nextUrl.split('=')[1].split('&')[0]
            : this.#state.count;
        const initial = final - 19;
        let template = `
            <h2>Lista de Pokemos (${initial} - ${final} / ${
            this.#state.count
        })</h2>
            <ul class="poke-list__list"></ul>`;
        template += `<div class="pagination"></div>`;
        return template;
    }
}
