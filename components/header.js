import { Component } from './component.js';
import { Menu } from './menu.js';

export class Header extends Component {
    #template;
    constructor(selector, title = 'Pokemons') {
        super();
        this.menuItems = [
            { path: 'index.html', label: 'Home' },
            { path: 'my-pokemons.html', label: 'Favorites' },
        ];
        this.menu = new Menu(this.menuItems);
        this.#template = `
            <header>
                <h1>${title}</h1>
                ${this.menu.template}
            </header>
        `;
        this.render(selector, this.#template);
    }
}
