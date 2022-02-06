import { PokeDetail } from './poke-detail';
import { screen } from '@testing-library/dom';

describe('Given the component PokeDetail', () => {
    describe('When it will be instantiated ', () => {
        let renderedComponent;
        let state;
        beforeEach(() => {
            state = { pokeData: [], favorites: [] };
            document.body.innerHTML = "<div class='poke-detail'></div>";
            renderedComponent = new PokeDetail('.poke-detail', state);
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });

        test('Then the title "Detalles del Pokemon" should be visible for the user', () => {
            expect(screen.getByText(/Detalles del Pokemon/i)).toBeTruthy();
        });
    });
});
