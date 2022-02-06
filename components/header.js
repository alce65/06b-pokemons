import { Component } from './component.js';
import { Menu } from './menu.js';

export class Header extends Component {
    #menuItems;
    #template;
    constructor(selector, title = 'Pokemons') {
        super();
        this.#menuItems = [
            { path: 'index.html', label: 'Home' },
            { path: 'my-pokemons.html', label: 'Favorites' },
        ];
        this.#template = this.#createTemplate(title);
        this.render(selector, this.#template);
        new Menu('.poke-menu', this.#menuItems);
    }

    #createTemplate(title) {
        return `
            <header class="header__main">
                <h1 class="header__title">${title}</h1>
                <div class="poke-menu"></div>
            </header>
            `;
    }
}
