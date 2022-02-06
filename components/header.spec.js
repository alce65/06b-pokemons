import { Header } from './header';
import { screen } from '@testing-library/dom';

describe('Given the component Header', () => {
    describe('When it will be instantiated ', () => {
        let renderedComponent;
        beforeEach(() => {
            document.body.innerHTML = "<div class='header'></div>";
            renderedComponent = new Header('.header');
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });

        test('Then the title "Pokemons" should be visible for the user', () => {
            expect(screen.getByText(/Pokemons/i)).toBeTruthy();
        });

        test('Then the menu should be visible for the user', () => {
            expect(screen.getByText(/Home/i)).toBeTruthy();
            expect(screen.getByText(/Favorites/i)).toBeTruthy();
        });
    });
});
