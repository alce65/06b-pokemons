import { URL_POKE_API, URL_FAVORITES } from './config.js';
import { apiServices } from './api-services.js';

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
        const initialPokeList = await apiServices().fetchPoke(url);
        this.count = initialPokeList.count;
        this.nextUrl = initialPokeList.next;
        this.previousUrl = initialPokeList.previous;

        const fullPokes = await Promise.all(
            initialPokeList.results.map(async (item) => {
                const pokeData = await apiServices().fetchPoke(item.url);
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
        this.favorites = await apiServices().fetchPoke(URL_FAVORITES);
    }

    async changeFavorites(id) {
        if (this.favorites.find((item) => +item.id === +id)) {
            let resp = await apiServices().removePoke(URL_FAVORITES + id);
            this.favorites = this.favorites.filter((item) => +item.id !== +id);
            console.log({ resp });
        } else {
            const newFavorite = this.pokeData.find((item) => +item.id === +id);
            let resp = await apiServices().addPoke(URL_FAVORITES, newFavorite);
            this.favorites = [...this.favorites, resp];
            console.log({ resp });
        }
        return this;
    }

    getDetail(origin, pokeId) {
        let pokeData = null;
        if (origin === '.my-poke-list__list') {
            pokeData = this.favorites.find((poke) => poke.id === pokeId);
        } else {
            pokeData = this.pokeData.find((poke) => poke.id === pokeId);
        }
        return pokeData;
    }
}
