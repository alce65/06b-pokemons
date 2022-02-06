import { Footer } from '../components/footer.js';
import { Header } from '../components/header.js';
import { MyPokeList } from '../components/my-poke-list.js';
import { Pagination } from '../components/pagination.js';
import { PokeDetail } from '../components/poke-detail.js';
import { HomePokeList } from '../components/home-poke-list.js';
import { State } from './state.js';

async function app() {
    const state = new State();
    console.log('App loaded', location.pathname);
    new Header('.header');
    new Footer('.footer');
    document.addEventListener('stateLoaded', () => {
        switch (location.pathname) {
            case '/':
            case '/index.html':
                new HomePokeList('.home-poke-list', state);
                new Pagination('.pagination', state);
                break;
            case '/my-pokemons.html':
                new MyPokeList('.my-poke-list', state);
                break;
            default:
                new PokeDetail('.poke-detail', state);
                break;
        }
    });
}

document.addEventListener('DOMContentLoaded', app);
