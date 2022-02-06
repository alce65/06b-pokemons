import { HomePokeList } from './home-poke-list';
import { screen } from '@testing-library/dom';

describe('Given the component HomePokeList', () => {
    let renderedComponent;
    let state;
    describe('When it will be instantiated ', () => {
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

    describe('When it will be instantiated with a state', () => {
        describe('and its the last pagination of th data', () => {
            beforeEach(() => {
                state = { pokeData: [], nextUrl: '', count: 1200 };
                document.body.innerHTML = "<div class='home-poke-list'></div>";
                renderedComponent = new HomePokeList('.home-poke-list', state);
            });
            test('Then the number of "Pokemons" should be visible for the user', () => {
                expect(screen.getByText(/1200/i)).toBeTruthy();
            });
        });

        describe('and its not the last pagination of th data', () => {
            beforeEach(() => {
                state = {
                    pokeData: [],
                    nextUrl:
                        'https://pokeapi.co/api/v2/pokemon/?offset=60&limit=20',
                    count: 1200,
                };
                document.body.innerHTML = "<div class='home-poke-list'></div>";
                renderedComponent = new HomePokeList('.home-poke-list', state);
            });
            test('Then the number of "Pokemons" should be visible for the user', () => {
                expect(screen.getByText(/60/i)).toBeTruthy();
            });
        });
    });
});
