import { State } from './state.js';
import * as service from './api-services.js';
import { URL_POKE_API } from './config.js';

// Mock full module and mock part of it
jest.mock('./api-services.js');

// eslint-disable-next-line no-import-assign
service.apiServices = jest.fn().mockImplementation(() => ({
    fetchPoke: jest.fn().mockImplementation((url) => {
        let data = [{ id: 1, name: 'snorlax' }];
        if (url === URL_POKE_API) {
            data = {
                count: 1118,
                next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
                previous: null,
                results: [
                    {
                        name: 'bulbasaur',
                        url: 'https://pokeapi.co/api/v2/pokemon/1/',
                    },
                ],
            };
        }
        return Promise.resolve(data);
    }),
    addPoke: jest.fn().mockResolvedValue({}),
    removePoke: jest.fn().mockResolvedValue({}),
}));

/*  const apiServicesMock = jest
    .spyOn(service, 'apiServices')
    .mockImplementation(() => ({
        fetchPoke: jest.fn().mockResolvedValue({}),
        addPoke: jest.fn().mockRejectedValue({}),
        removePoke: jest.fn().mockRejectedValue({}),
    })); */

describe('Given the class State', () => {
    describe('When it will be instantiated ', () => {
        let state;
        beforeAll(() => {
            state = new State();
        });
        test('Then it should be created', () => {
            expect(state).toBeDefined();
            expect(service.apiServices).toHaveBeenCalled();
        });

        describe('And method hydrateData is implemented', () => {
            test('Then it should be used', async () => {
                expect(state).toHaveProperty('hydrateData');
                await state.hydrateData();
                expect(service.apiServices).toHaveBeenCalled();
                // expect(service.apiServices().fetchPoke).toHaveBeenCalled();
            });
        });

        describe('And method hydrateFavorites is implemented', () => {
            test('Then it should be used', async () => {
                expect(state).toHaveProperty('hydrateFavorites');
                await state.hydrateFavorites();
                expect(service.apiServices).toHaveBeenCalled();
                // expect(service.apiServices().fetchPoke).toHaveBeenCalled();
            });
        });

        describe('And method changeFavorites is implemented', () => {
            test('Then it should be used for add favorites', async () => {
                expect(state).toHaveProperty('changeFavorites');
                await state.changeFavorites(2);
                expect(service.apiServices).toHaveBeenCalled();
                // expect(service.apiServices().addPoke).toHaveBeenCalled();
            });
            test('Then it should be used for remove favorites', async () => {
                expect(state).toHaveProperty('changeFavorites');
                await state.changeFavorites(1);
                expect(service.apiServices).toHaveBeenCalled();
                // expect(service.apiServices().removePoke).toHaveBeenCalled();
            });
        });

        describe('And method getDetail is implemented', () => {
            test('Then it should be used for favorites', () => {
                const origin = '.my-poke-list__list';
                const pokeId = 1;
                expect(state).toHaveProperty('getDetail');
                state.favorites = [{ id: 1 }];
                expect(state.getDetail(origin, pokeId)).toHaveProperty('id', 1);
            });
            test('Then it should be used for home page', () => {
                const origin = '.poke-list__list';
                const pokeId = 1;
                expect(state).toHaveProperty('getDetail');
                state.pokeData = [{ id: 1 }];
                expect(state.getDetail(origin, pokeId)).toHaveProperty('id', 1);
            });
        });
    });
});
