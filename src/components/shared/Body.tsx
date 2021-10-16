import React from 'react';
import { fireEvent, render, waitForElement } from '@testing-library/react';
import fetchMock from "fetch-mock";
import BodyBook from './BodyBook';


describe('Test App', () => {
    afterEach(() => {
        fetchMock.restore();
    });
    test('Verify if the books loaded', async () => {
        const books = [
            { name: 'A Game of Thrones' },
            { name: 'A Clash of Kings' },
            { name: 'A Storm of Swords' },
            { name: 'The Hedge Knight' },
            { name: 'A Feast for Crows' },
            { name: 'The Sworn Sword' },
            { name: 'The Mystery Knight' },
            { name: 'A Dance with Dragons' },
            { name: 'The Princess and the Queen' },
            { name: 'The Rogue Prince' }
            
        ];
        fetchMock.mock('https://www.anapioficeandfire.com/api/books', {
            body: books,
            status: 200
        });

        const {getByText} = render(<BodyBook/>);

        const book1 = await waitForElement(
            () => getByText(' A Game of Thrones')
        );
        expect(book1).toBeInTheDocument();
    })

})