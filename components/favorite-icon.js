import { Component } from './component.js';

export class FavoriteIcon extends Component {
    #state;
    #pokeId;
    #template;
    constructor(selector, state, pokeId) {
        super();
        this.#state = state;
        this.#pokeId = pokeId;
        this.#template = this.#createTemplate();
        this.render(selector, this.#template);
        this.#manageComponent(selector);
    }

    #createTemplate() {
        let template = `<i class="icon--score far fa-heart"></i>`;
        return template;
    }

    #manageComponent(selector) {
        const componentElement = document.querySelector(selector);
        const icon = componentElement.querySelector('.poke-item__fav i');
        if (this.#state.favorites.find((item) => +item.id === +this.#pokeId)) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.add('far');
            icon.classList.remove('fas');
        }
        icon.addEventListener('click', this.#handleIconFavorite.bind(this));
    }

    #handleIconFavorite(ev) {
        ev.preventDefault();
        ev.target.classList.toggle('far');
        ev.target.classList.toggle('fas');
        this.#state.changeFavorites(this.#pokeId).then(() => {
            console.log('Favorite state changed');
        });
    }
}
