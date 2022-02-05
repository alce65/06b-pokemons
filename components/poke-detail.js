import { Component } from './component.js';

export class PokeDetail extends Component {
    #pokeId;
    #template;
    #state;
    #pokeData;
    constructor(selector, state) {
        super();
        this.#pokeId = Number(location.search.split('=')[1]);
        this.#state = state;
        this.#pokeData = this.#state.pokeData.find(
            (poke) => poke.id === this.#pokeId
        );
        this.#template = this.#createTemplate();
        this.render(selector, this.#template);
    }

    #createTemplate() {
        let template = `
            <h2>Detalles</h2>
            <div class="poke-detail">`;
        template += `<p>Pokemon ${this.#pokeId}</p>`;
        template += `<ul>${this.#showPokeData(this.#pokeData)}</ul>`;
        template += `</div>`;
        return template;
    }
    #showPokeData(object) {
        let template = '';
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const value = object[key];
                if (typeof value === 'object') {
                    // TODO
                    template += `<li>
                        <details>
                        <summary>${key}</summary>:
                        <ul>${this.#showPokeData(value)}</ul>
                        <details>
                    </li>`;
                } else {
                    template += `<li><span>${key}</span>: ${value}</li>`;
                }
            }
        }
        return template;
    }
}
