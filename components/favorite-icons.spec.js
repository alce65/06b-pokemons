import { FavoriteIcon } from './favorite-icon';
import { screen } from '@testing-library/dom';

describe('Given the component FavoriteIcon', () => {
    describe('When it will be instantiated ', () => {
        let state;
        let renderedComponent;
        beforeEach(() => {
            state = {
                pokeData: [{ id: 2, name: 'Pepe' }],
                favorites: [{ id: 1, name: 'Snorlax' }],
            };
            document.body.innerHTML = "<div class='favorite-icon'></div>";
            renderedComponent = new FavoriteIcon('.favorite-icon', state, 1);
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });
        describe('and the icon is assigned to a favorite pokemon', () => {
            test('Then the icon solid for "Favorite" should be visible for the user', () => {
                renderedComponent = new FavoriteIcon(
                    '.favorite-icon',
                    state,
                    1
                );
                expect(screen.getByRole('button')).toBeTruthy();
                expect(
                    screen.getByRole('button').classList.contains('fas')
                ).toBe(true);
            });
        });
        describe('and the icon is assigned to a non favorite pokemon', () => {
            test('Then the icon regular for "Favorite" should be visible for the user', () => {
                renderedComponent = new FavoriteIcon(
                    '.favorite-icon',
                    state,
                    2
                );
                expect(screen.getByRole('button')).toBeTruthy();
                expect(
                    screen.getByRole('button').classList.contains('far')
                ).toBe(true);
            });
        });
    });
});
