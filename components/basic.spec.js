import { Basic } from './basic';
import { screen } from '@testing-library/dom';

describe('Given the component ...', () => {
    describe('When it will be instantiated ', () => {
        let renderedComponent;
        beforeEach(() => {
            document.body.innerHTML = "<div id='header'></div>";
            renderedComponent = new Basic('#header');
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });

        test('Then the title "Basic" should be visible for the user', () => {
            expect(screen.getByText(/Basic/i)).toBeTruthy();
        });
    });
});
