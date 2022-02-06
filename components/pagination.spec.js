import { Pagination } from './pagination';
import { screen } from '@testing-library/dom';

describe('Given the component Pagination', () => {
    describe('When it will be instantiated ', () => {
        let renderedComponent;
        let state;
        beforeEach(() => {
            state = {};
            document.body.innerHTML = "<div class='pagination'></div>";
            renderedComponent = new Pagination('.pagination', state);
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });

        test('Then the title "Basic" should be visible for the user', () => {
            expect(screen.getByText(/Anterior/i)).toBeTruthy();
            expect(screen.getByText(/Siguiente/i)).toBeTruthy();
        });
    });
});
