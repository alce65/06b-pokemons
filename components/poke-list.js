import { Component } from './component.js';

export class PokeList extends Component {
    #template;
    #state;
    constructor(selector, state) {
        super();
        this.#state = state;
        this.#template = this.#createTemplate();
        this.render(selector, this.#template);
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
            <ul class="poke-list__list">`;
        this.#state.pokeData.forEach((poke) => {
            template += `
                <li class="poke-item">
                    <a class="poke-item__link" href='./detail.html?id=${poke.id}'>
                        <span class="poke-item__link-label">${poke.name}</span>
                        <span class="poke-item__link-sprite">
                            <img class="poke-item__link-sprite-front"
                            src="${poke.sprites.front_default}" alt="${poke.name}">
                            <img class="poke-item__link-sprite-back"
                            src="${poke.sprites.back_default}" alt="${poke.name}">
                        </span>
                    </a>
                    <span class="poke-item__fav">
                     <i class="icon--score far fa-heart"></i>
                    </span>
                </li>`;
        });

        template += `</ul><div class="pagination"></div>`;
        return template;
    }
}
