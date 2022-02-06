import { apiServices } from './api-services.js';

describe('Given the api-services', () => {
    describe('When it will be executed ', () => {
        // Mock global fetch
        global.fetch = jest.fn().mockResolvedValue({
            json: () =>
                Promise.resolve([{ test: 'Test 1' }, { test: 'Test 1' }]),
        });

        let service;
        beforeEach(() => {
            service = apiServices();
        });
        test('Then it should be created', () => {
            expect(service).toBeDefined();
        });
        test('Its functions should be used', () => {
            service.fetchPoke();
            expect(global.fetch).toHaveBeenCalled();
            service.addPoke();
            expect(global.fetch).toHaveBeenCalled();
            service.removePoke();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
});
