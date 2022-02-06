import { FavoriteIcon } from './favorite-icon';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('Given the component FavoriteIcon', () => {
    describe('When it will be instantiated ', () => {
        let state;
        let renderedComponent;
        beforeEach(() => {
            state = {
                pokeData: [{ id: 2, name: 'Pepe' }],
                favorites: [{ id: 1, name: 'Snorlax' }],
                changeFavorites: jest.fn().mockResolvedValue({}),
            };
            document.body.innerHTML = `<div class='favorite-icon'></div>`;
            renderedComponent = new FavoriteIcon('.favorite-icon', state, 1);
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });
        describe('and the icon is assigned to a favorite pokemon', () => {
            test('Then the icon solid for "Favorite" should be visible and modifiable', () => {
                renderedComponent = new FavoriteIcon(
                    '.favorite-icon',
                    state,
                    1
                );
                const elementIcon = screen.getByRole('button');
                expect(elementIcon).toBeTruthy();
                expect(elementIcon.classList.contains('fas')).toBe(true);
                userEvent.click(elementIcon);
                expect(elementIcon.classList.contains('far')).toBe(true);
            });
        });
        describe('and the icon is assigned to a non favorite pokemon', () => {
            test('Then the icon regular for "Favorite" should be visible and modifiable', () => {
                renderedComponent = new FavoriteIcon(
                    '.favorite-icon',
                    state,
                    2
                );
                const elementIcon = screen.getByRole('button');
                expect(elementIcon).toBeTruthy();
                expect(elementIcon.classList.contains('far')).toBe(true);
                userEvent.click(elementIcon);
                expect(elementIcon.classList.contains('fas')).toBe(true);
            });
        });
    });
});
