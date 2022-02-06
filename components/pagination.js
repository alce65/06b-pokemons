import { Component } from './component.js';

export class Pagination extends Component {
    #state;
    #template;
    constructor(selector, state) {
        super();
        this.#state = state;
        this.#template = this.#createTemplate();
        this.render(selector, this.#template);
        this.#manageComponent(selector);
    }

    #createTemplate() {
        let template = `
            <button class="pagination__button" type="button" data-id="prev">
                <i class="fas fa-backward" data-id="prev"></i>
                <span data-id="prev">Anterior</span>
            </button>
            <button class="pagination__button" type="button" data-id="next">
                <span data-id="next">Siguiente</span>
                <i class="fas fa-forward" data-id="next"></i>
            </button>
        `;
        return template;
    }

    #manageComponent(selector) {
        const componentElement = document.querySelector(selector);
        const buttons = componentElement.querySelectorAll(
            '.pagination__button'
        );
        if (!this.#state.previousUrl) {
            buttons[0].setAttribute('disabled', true);
        } else if (!this.#state.nextUrl) {
            buttons[1].setAttribute('disabled', true);
        }
        buttons.forEach((button) => {
            button.addEventListener('click', this.#handleButton.bind(this));
        });
    }
    #handleButton(ev) {
        switch (ev.target.dataset.id) {
            case 'next':
                this.#state.hydrateData(this.#state.nextUrl).then(() => {
                    document.dispatchEvent(new Event('stateLoaded'));
                });
                break;
            case 'prev':
                this.#state.hydrateData(this.#state.previousUrl).then(() => {
                    document.dispatchEvent(new Event('stateLoaded'));
                });
                break;
            default:
                console.log(this.#state);
        }
    }
}
