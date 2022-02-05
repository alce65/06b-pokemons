import { Component } from './component.js';
import { Menu } from './menu.js';

export class Header extends Component {
    #menuItems;
    #menu;
    #template;
    constructor(selector, title = 'Pokemons') {
        super();
        this.#menuItems = [
            { path: 'index.html', label: 'Home' },
            { path: 'my-pokemons.html', label: 'Favorites' },
        ];
        this.#menu = new Menu(this.#menuItems);
        this.#template = this.#createTemplate(title);
        this.render(selector, this.#template);
    }

    #createTemplate(title) {
        return `
            <header class="header__main">
                <h1 class="header__title">${title}</h1>
                ${this.#menu.template}
            </header>
            `;
    }
}
