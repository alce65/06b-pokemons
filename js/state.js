import { URL_POKE_API } from './config.js';

export class State {
    count;
    nextUrl;
    previousUrl;
    pokeData;
    constructor() {
        this.hydrateData().then(() => {
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

    async #fetchPoke(url) {
        const resp = await fetch(url, {
            mode: 'cors',
        });
        return resp.json();
    }
}
