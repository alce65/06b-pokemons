import { PokeList } from './poke-list';
import { screen } from '@testing-library/dom';

describe('Given the component PokeList', () => {
    describe('When it will be instantiated ', () => {
        let state;
        let renderedComponent;
        beforeEach(() => {
            state = {
                pokeData: [
                    {
                        name: 'Snorlax',
                        age: 22,
                        data: {
                            sample: '',
                        },
                    },
                ],
                favorites: [
                    {
                        name: 'Snorlax',
                        age: 22,
                        data: {
                            sample: '',
                        },
                    },
                ],
            };
            document.body.innerHTML = "<div class='poke-list'></div>";
            renderedComponent = new PokeList(
                '.poke-list',
                state.pokeData,
                state
            );
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });

        test('Then the title "Poke List" should be visible for the user', () => {
            expect(screen.getByText(/Snorlax/i)).toBeTruthy();
        });
    });
});
