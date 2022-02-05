import { Footer } from '../components/footer.js';
import { Header } from '../components/header.js';
import { MyPokeList } from '../components/my-poke-list.js';
import { PokeDetail } from '../components/poke-detail.js';
import { PokeList } from '../components/poke-list.js';
import { URL_POKE_API } from './config.js';

async function app() {
    const pokeData = await hydrateData();
    console.log({ pokeData });
    console.log('Index loaded');
    new Header('.header');
    console.log(location.pathname);
    switch (location.pathname) {
        case '/':
        case '/index.html':
            new PokeList('.poke-list', pokeData);
            break;
        case '/my-pokemons.html':
            new MyPokeList('.my-poke-list');
            break;
        default:
            new PokeDetail('.poke-detail');
            break;
    }
    new Footer('.footer');
}

async function hydrateData() {
    const initialPokeList = await fetchPoke(URL_POKE_API);
    console.log(initialPokeList);

    const fullPokes = await Promise.all(
        initialPokeList.results.map(async (item) => {
            const pokeData = await fetchPoke(item.url);
            return pokeData;
        })
    );

    console.log(fullPokes);

    return initialPokeList.results.map((item) => {
        const id = item.url.split('/').at(-2);
        const sprites = fullPokes.find((poke) => {
            return poke.name === item.name;
        })?.sprites;
        return { ...item, id: id, sprites: sprites };
    });

    /*return initialPokeList.results.reduce(async (prev, item) => {
         const id = item.url.split('/').at(-2);
        const pokeData = await fetchPoke(item.url);
        console.log(pokeData);
        await prev;
        return [...prev, { ...item, id: id, sprites: pokeData.sprites }];
    }, []); */
}

async function fetchPoke(url) {
    const resp = await fetch(url, {
        mode: 'cors',
    });
    return resp.json();
}

document.addEventListener('DOMContentLoaded', app);
