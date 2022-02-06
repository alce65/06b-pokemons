import { Footer } from './footer';
import { screen } from '@testing-library/dom';

describe('Given the component Footer', () => {
    describe('When it will be instantiated ', () => {
        let renderedComponent;
        beforeEach(() => {
            document.body.innerHTML = "<div class='footer'></div>";
            renderedComponent = new Footer('.footer');
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });

        test('Then the footer "ISDI" should be visible for the user', () => {
            expect(screen.getByText(/ISDI/i)).toBeTruthy();
        });
    });
});
