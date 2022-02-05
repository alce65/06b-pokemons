import { Component } from './component.js';

export class Menu extends Component {
    template;
    constructor(options) {
        super();
        this.template = this.#createTemplate(options);
    }
    #createTemplate(options) {
        let template =
            '<nav class="poke-menu"><ul class="poke-menu__list-items">';
        options.forEach((item) => {
            template += `<li class="poke-menu__item">
                <a href="${item.path}" class="poke-menu__link">${item.label}</a>
            </li>`;
        });
        template += `</ul></nav>`;
        return template;
    }
}
