import { Pagination } from './pagination';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('Given the component Pagination', () => {
    describe('When it will be instantiated ', () => {
        let renderedComponent;
        let state;
        beforeEach(() => {
            state = {
                previousUrl: 'http://',
                nextUrl: 'http://',
                hydrateData: jest.fn().mockResolvedValue({}),
            };
            document.body.innerHTML = "<div class='pagination'></div>";
            renderedComponent = new Pagination('.pagination', state);
        });
        test('Then it should be rendered', () => {
            expect(renderedComponent).toBeDefined();
        });

        test('Then the buttons should be visible for the user', () => {
            const btnPrev = screen.getByText(/Anterior/i);
            expect(btnPrev).toBeTruthy();
            const btnNext = screen.getByText(/Siguiente/i);
            expect(btnNext).toBeTruthy();
        });

        describe('and it is the first pagination block', () => {
            test('the "prev" button should be disabled', () => {
                state.previousUrl = '';
                renderedComponent = new Pagination('.pagination', state);
                const buttons = screen.getAllByRole('button');
                expect(buttons[0].getAttribute('disabled')).toBe('true');
            });
        });
        describe('and it is the last pagination block', () => {
            test('the "prev" button should be disabled', () => {
                state.nextUrl = '';
                renderedComponent = new Pagination('.pagination', state);
                const buttons = screen.getAllByRole('button');
                expect(buttons[1].getAttribute('disabled')).toBe('true');
            });
        });

        test('then the buttons should be used', () => {
            const buttons = screen.getAllByRole('button');
            userEvent.click(buttons[0]);
            expect(state.hydrateData).toHaveBeenCalled();
            userEvent.click(buttons[1]);
            expect(state.hydrateData).toHaveBeenCalled();
        });
    });
});
