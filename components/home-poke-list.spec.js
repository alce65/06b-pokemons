import { HomePokeList } from './home-poke-list';
import { screen } from '@testing-library/dom';

describe('Given the component HomePokeList', () => {
    describe('When it will be instantiated ', () => {
        let renderedComponent;
        let state;
        beforeEach(() => {
            state = { pokeData: [] };
            document.body.innerHTML = "<div class='home-poke-list'></div>";
            renderedComponent = new HomePokeList('.home-poke-list', state);
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });

        test('Then the title "Pokemons" should be visible for the user', () => {
            expect(screen.getByText(/Pokemons/i)).toBeTruthy();
        });
    });
});
