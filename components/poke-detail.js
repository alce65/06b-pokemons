import { detailUrlParse } from '../js/helpers.js';
import { Component } from './component.js';
import { FavoriteIcon } from './favorite-icon.js';

export class PokeDetail extends Component {
    #state;
    #template;
    #pokeId;
    #origin;
    #pokeData;
    constructor(selector, state) {
        super();
        const { pokeId, origin } = detailUrlParse();
        this.#pokeId = pokeId;
        this.#origin = origin;
        this.#state = state;
        if (this.#origin === '.my-poke-list__list') {
            this.#pokeData = this.#state.favorites.find(
                (poke) => poke.id === this.#pokeId
            );
        } else {
            this.#pokeData = this.#state.pokeData.find(
                (poke) => poke.id === this.#pokeId
            );
        }
        this.#template = this.#createTemplate();
        this.render(selector, this.#template);
        new FavoriteIcon('.poke-item__fav', state, this.#pokeId);
    }

    #createTemplate() {
        let template = `
            <h2 class="detail-title">
                <span>Detalles del Pokemon ${this.#pokeId}:</span>
                <span class="detail-title__poke-name">
                    ${this.#pokeData?.name}
                </span>
                <span class="poke-item__fav"></span>
            </h2>
            <div class="poke-detail">`;
        template += `<ul>${this.#showPokeData(this.#pokeData)}</ul>`;
        template += `</div>`;
        return template;
    }

    #showPokeData(object) {
        let template = '';
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key) && key !== 'name') {
                const value = object[key];
                if (typeof value === 'object') {
                    template += `<li>
                        <details>
                        <summary>${key}:</summary>
                        <ul>${this.#showPokeData(value)}</ul>
                        </details>
                    </li>`;
                } else {
                    template += `<li><span>${key}</span>: ${value}</li>`;
                }
            }
        }
        return template;
    }
}
