import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import fetchMock from "fetch-mock";
import BodyBook from './components/shared/BodyBook';
import axiosMock from 'axios'

jest.mock('axios')


// describe('Test App', () => {
//     afterEach(() => {
//         fetchMock.restore();
//     });

//     test('Verify if the books loaded', async () => {
//         const books = [
//             { name: 'A Game of Thrones' },
//             { name: 'A Clash of Kings' },
//             { name: 'A Storm of Swords' },
//             { name: 'The Hedge Knight' },
//             { name: 'A Feast for Crows' },
//             { name: 'The Sworn Sword' },
//             { name: 'The Mystery Knight' },
//             { name: 'A Dance with Dragons' },
//             { name: 'The Princess and the Queen' },
//             { name: 'The Rogue Prince' }
//         ];
//         fetchMock.mock('https://www.anapioficeandfire.com/api/books', {
//             body: books,
//             status: 200
//         });

//         const {getByText} = render(<BodyBook/>);

//         const book1 = await waitFor(
//             () => getByText(' A Game of Thrones')
//         );
//         expect(book1).toBeInTheDocument();
//     })

// })

// it('should display a loading text', () => {

//     const { getByTestId } = render(<BodyBook />)
   
//      expect(getByTestId('loading')).toHaveTextContent("ThreeDots")
//    })

it('should load and display the data', async () => {
    const url = '/greeting'
    const { getByTestId } = render(<BodyBook />)
  
    // axiosMock.get.mockResolvedValueOnce({
    //   data: { greeting: 'hello there' },
    // })
    axiosMock.get.mockResolvedValueOnce
    fireEvent.click(getByTestId('fetch-data'))

    const greetingData = await waitFor(() => getByTestId('show-data'))
  
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(url)
    expect(greetingData).toHaveTextContent('hello there')

})