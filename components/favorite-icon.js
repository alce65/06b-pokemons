import { Component } from './component.js';
import { MyPokeList } from './my-poke-list.js';

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
        let template = `<i role="button" class="icon--score far fa-heart"></i>`;
        return template;
    }

    #manageComponent(selector) {
        const componentElement = document.querySelector(selector);
        const icon = componentElement.querySelector('i');
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
        this.#state.changeFavorites(this.#pokeId).then((state) => {
            if (document.querySelector('.my-poke-list')) {
                new MyPokeList('.my-poke-list', state);
            }
            console.log('Favorite state changed');
        });
    }
}
