import { Component } from './component.js';
import { FavoriteIcon } from './favorite-icon.js';

export class PokeList extends Component {
    #state;
    #pokeData;
    #template;
    constructor(selector, pokeData, state) {
        super();
        this.#state = state;
        this.#pokeData = pokeData;
        this.#template = this.#createTemplate(selector);
        this.render(selector, this.#template);
        this.#manageComponent(selector);
    }

    #createTemplate(selector) {
        let template = ``;
        this.#pokeData.forEach((poke) => {
            template += `
                <li class="poke-item">
                    <a class="poke-item__link" href='./detail.html?id=${poke.id}&origin=${selector}'>
                        <span class="poke-item__link-label">${poke.name}</span>
                        <span class="poke-item__link-sprite">
                            <img class="poke-item__link-sprite-front"
                            src="${poke.sprites?.front_default}" alt="${poke.name}">
                            <img class="poke-item__link-sprite-back"
                            src="${poke.sprites?.back_default}" alt="${poke.name}">
                        </span>
                    </a>
                    <span class="poke-item__fav" id="fav-${poke.id}" data-id="${poke.id}" ></span>
                </li>`;
        });
        return template;
    }

    #manageComponent(selector) {
        const componentElement = document.querySelector(selector);
        const icons = componentElement.querySelectorAll('.poke-item__fav');
        icons.forEach((icon) => {
            new FavoriteIcon('#' + icon.id, this.#state, icon.dataset.id);
        });
    }
}
