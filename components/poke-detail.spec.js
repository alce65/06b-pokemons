import { PokeDetail } from './poke-detail';
import { screen } from '@testing-library/dom';

describe('Given the component PokeDetail', () => {
    describe('When it will be instantiated ', () => {
        let renderedComponent;
        let state;
        beforeEach(() => {
            state = {
                pokeData: [],
                favorites: [],
                getDetail: jest.fn(() => {
                    console.log('Get detail mock');
                    return {
                        name: 'Snorlax',
                        age: 22,
                        data: {
                            sample: '',
                        },
                    };
                }),
            };
            document.body.innerHTML = "<div class='poke-detail'></div>";
            renderedComponent = new PokeDetail('.poke-detail', state);
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });

        test('Then the title "Detalles del Pokemon" should be visible for the user', () => {
            expect(screen.getByText(/Detalles del Pokemon/i)).toBeTruthy();
        });

        test('Then the Pokemon name should be visible for the user', () => {
            expect(screen.getByText(/Snorlax/i)).toBeTruthy();
        });
    });
});
