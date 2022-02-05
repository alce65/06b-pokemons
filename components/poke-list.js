import { Component } from './component.js';

export class PokeList extends Component {
    #template;
    #pokeList;
    constructor(selector, pokelist) {
        super();
        this.#pokeList = pokelist;
        this.#template = this.#createTemplate();
        this.render(selector, this.#template);
    }

    #createTemplate() {
        let template = `
            <h2>Lista de Pokemos</h2>
            <ul class="poke-list__list">`;
        this.#pokeList.forEach((poke) => {
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

        template += `</ul>
            <div class="pagination">
                <button class="pagination__button" type="button">
                    <i class="fas fa-backward"></i>
                    <span>Anterior</span>
                </button>
                <button class="pagination__button" type="button">
                    <span>Siguiente</span>
                    <i class="fas fa-forward"></i>
                </button>
            </div>
        `;
        return template;
    }
}
