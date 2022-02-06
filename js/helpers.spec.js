import { detailUrlParse } from './helpers';

describe('Given the helpers', () => {
    describe('When detailUrlParse will be executed ', () => {
        test('An object should be returned', () => {
            delete window.location;
            window.location = new URL(
                'http://127.0.0.1:8080/detail.html?id=2&origin=.poke-list__list'
            );
            expect(detailUrlParse()).toHaveProperty(
                'origin',
                '.poke-list__list'
            );
            expect(detailUrlParse()).toHaveProperty('pokeId', 2);
        });
    });
});
