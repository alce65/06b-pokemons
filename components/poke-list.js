import { Component } from './component.js';

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
        this.manageComponent(selector);
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
                    <span class="poke-item__fav"></span>
                    <span class="poke-item__fav">
                        <i class="icon--score far fa-heart" data-id=${poke.id}></i>
                    </span>
                </li>`;
        });
        return template;
    }

    manageComponent(selector) {
        const componentElement = document.querySelector(selector);
        const icons = componentElement.querySelectorAll('.poke-item__fav i');
        icons.forEach((icon) => {
            if (
                this.#state.favorites.find(
                    (item) => +item.id === +icon.dataset.id
                )
            ) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.add('far');
                icon.classList.remove('fas');
            }
            icon.addEventListener('click', this.handleIconFavorite.bind(this));
        });
    }

    handleIconFavorite(ev) {
        ev.preventDefault();
        ev.target.classList.toggle('far');
        ev.target.classList.toggle('fas');
        this.#state.changeFavorites(ev.target.dataset.id).then(() => {
            console.log('Favorite state changed');
        });
    }
}
