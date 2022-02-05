import { Component } from './component.js';

export class Menu extends Component {
    template;
    constructor(options) {
        super();
        this.template = this.#createTemplate(options);
    }
    #createTemplate(options) {
        let template = '<nav class="pokemons-menu"><ul>';
        options.forEach((item) => {
            template += `<li><a href="${item.path}">${item.label}</a></li>`;
        });
        template += `</ul></nav>`;
        return template;
    }
}
