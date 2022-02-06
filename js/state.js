import { MyPokeList } from '../components/my-poke-list.js';
import { URL_POKE_API, URL_FAVORITES } from './config.js';

export class State {
    count;
    nextUrl;
    previousUrl;
    pokeData;
    favorites;
    constructor() {
        Promise.all([this.hydrateData(), this.hydrateFavorites()]).then(() => {
            console.log(this);
            document.dispatchEvent(new Event('stateLoaded'));
        });
    }

    async hydrateData(url = URL_POKE_API) {
        const initialPokeList = await this.#fetchPoke(url);
        this.count = initialPokeList.count;
        this.nextUrl = initialPokeList.next;
        this.previousUrl = initialPokeList.previous;

        const fullPokes = await Promise.all(
            initialPokeList.results.map(async (item) => {
                const pokeData = await this.#fetchPoke(item.url);
                return pokeData;
            })
        );

        this.pokeData = initialPokeList.results.map((item) => {
            const id = item.url.split('/').at(-2);
            const fullPoke = fullPokes.find((poke) => {
                return poke.name === item.name;
            });
            return { ...item, id: id, ...fullPoke };
        });

        /*return initialPokeList.results.reduce(async (prev, item) => {
         const id = item.url.split('/').at(-2);
        const pokeData = await fetchPoke(item.url);
        console.log(pokeData);
        await prev;
        return [...prev, { ...item, id: id, sprites: pokeData.sprites }];
    }, []); */
    }

    async hydrateFavorites() {
        this.favorites = await this.#fetchPoke(URL_FAVORITES);
    }

    async #fetchPoke(url) {
        const resp = await fetch(url, {
            mode: 'cors',
        });
        return resp.json();
    }

    async #addPoke(url, body) {
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-type': 'application/json',
            }),
        });
        return resp.json();
    }

    async #removePoke(url) {
        const resp = await fetch(url, {
            method: 'DELETE',
        });
        return resp.json();
    }

    async changeFavorites(id) {
        if (this.favorites.find((item) => +item.id === +id)) {
            let resp = await this.#removePoke(URL_FAVORITES + id);
            this.favorites = this.favorites.filter((item) => +item.id !== +id);
            if (document.querySelector('.my-poke-list')) {
                new MyPokeList('.my-poke-list', this);
            }
            console.log(resp);
        } else {
            const newFavorite = this.pokeData.find((item) => +item.id === +id);
            let resp = await this.#addPoke(URL_FAVORITES, newFavorite);
            this.favorites = [...this.favorites, resp];
            console.log(resp);
        }
    }
}
