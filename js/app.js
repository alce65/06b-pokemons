import { Header } from '../components/header.js';
import { MyPokeList } from '../components/my-poke-list.js';
import { PokeDetail } from '../components/poke-detail.js';
import { PokeList } from '../components/poke-list.js';

function app() {
    console.log('Index loaded');
    new Header('.header');
    console.log(location.pathname);
    switch (location.pathname) {
        case '/':
        case '/index.html':
            new PokeList('.poke-list');
            break;
        case '/my-pokemons.html':
            new MyPokeList('.my-poke-list');
            break;
        default:
            new PokeDetail('.poke-detail');
            break;
    }

    // new Footer('#footer');
}

document.addEventListener('DOMContentLoaded', app);
