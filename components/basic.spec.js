import { Basic } from './basic';
import { screen } from '@testing-library/dom';

describe('Given the component Basic', () => {
    describe('When it will be instantiated ', () => {
        let renderedComponent;
        beforeEach(() => {
            document.body.innerHTML = "<div class='basic'></div>";
            renderedComponent = new Basic('.basic');
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });

        test('Then the title "Basic" should be visible for the user', () => {
            expect(screen.getByText(/Basic/i)).toBeTruthy();
        });
    });
});
