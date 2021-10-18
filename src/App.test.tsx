import React from 'react'
import { render, waitFor, screen, within, cleanup, act } from '@testing-library/react'
import BodyBook from './components/shared/BodyBook';
import BookHeader from './components/shared/BookHeader';
import { singleBook } from './components/shared/apis/api';
import { mocked } from 'ts-jest/utils';


afterEach(() => {
    cleanup;
    jest.resetAllMocks();
});
jest.mock('./components/shared/apis/api')

const mockedAxios = mocked(singleBook);
const book = [{
    name: 'A Game of Thrones',
    publisher: "Bantam Books",
    released: "1996-08-01T00:00:00",
    isbn: "978-0553103540",
    authors: ['George R. R. Martin']
}]

// test('Renders a book correctly', async () => {
//     mockedAxios.mockImplementationOnce(() => Promise.resolve(book));

//     await act(async () => {
//         const { getByText } = render(<BodyBook />);
//          waitFor(() => [
//             expect(
//                 getByText(
//                     'A Game of Thrones',
//                 ),
//             ).toBeTruthy(),
//         ]);
//     });
// });

it('should display a Book Store text', () => {
    render(<BookHeader />)
    screen.getByRole('heading', { name: /Book Store/ })
})