import { MyPokeList } from './my-poke-list';
import { screen } from '@testing-library/dom';

describe('Given the component MyPokeList', () => {
    describe('When it will be instantiated ', () => {
        let renderedComponent;
        let state;
        beforeEach(() => {
            state = { favorites: [] };
            document.body.innerHTML = "<div class='my-poke-list'></div>";
            renderedComponent = new MyPokeList('.my-poke-list', state);
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });

        test('Then the title "Pokemons favoritos" should be visible for the user', () => {
            expect(screen.getByText(/Pokemons favoritos/i)).toBeTruthy();
        });
    });
});
