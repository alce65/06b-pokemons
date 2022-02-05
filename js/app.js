import { Footer } from '../components/footer.js';
import { Header } from '../components/header.js';
import { MyPokeList } from '../components/my-poke-list.js';
import { Pagination } from '../components/pagination.js';
import { PokeDetail } from '../components/poke-detail.js';
import { PokeList } from '../components/poke-list.js';
import { State } from './state.js';

async function app() {
    const state = new State();
    console.log('Index loaded');
    new Header('.header');
    console.log(location.pathname);
    document.addEventListener('stateLoaded', () => {
        switch (location.pathname) {
            case '/':
            case '/index.html':
                new PokeList('.poke-list', state);
                new Pagination('.pagination', state);
                break;
            case '/my-pokemons.html':
                new MyPokeList('.my-poke-list');
                break;
            default:
                new PokeDetail('.poke-detail');
                break;
        }
    });

    new Footer('.footer');
}

document.addEventListener('DOMContentLoaded', app);
