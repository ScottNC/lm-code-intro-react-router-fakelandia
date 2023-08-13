import { act, render, screen } from '@testing-library/react';
import { MisdemeanourTable } from '../MisdemeanourTable';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import 'jest-fetch-mock';
global.fetch = require('jest-fetch-mock');

describe('MisdemeanourTable', () => {

  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => ({
          misdemeanours: [
            {
              citizenId: 1,
              misdemeanour: 'united',
              date: '01/01/2000'
            },
            {
              citizenId: 2,
              misdemeanour: 'lift',
              date: '01/01/2000'
            },
            {
              citizenId: 3,
              misdemeanour: 'lift',
              date: '01/01/2000'
            },
            {
              citizenId: 4,
              misdemeanour: 'vegetables',
              date: '01/01/2000'
            },
            {
              citizenId: 5,
              misdemeanour: 'vegetables',
              date: '01/01/2000'
            },
            {
              citizenId: 6,
              misdemeanour: 'rudeness',
              date: '01/01/2000'
            },
          ]
      })
    });
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('displays a table with the title and all the rows', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <MisdemeanourTable />
        </MemoryRouter>
      );
    });
    
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/misdemeanours/10'
    );

    const table = document.querySelector('.table');
    expect(table).toBeInTheDocument();

    const rows = table?.querySelectorAll('.table--row');
    expect(rows?.length).toBe(7);
  });

  it('should filter for different misdemeanours', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <MisdemeanourTable />
        </MemoryRouter>
      );
    });
    
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/misdemeanours/10'
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    await userEvent.selectOptions(selectElement, '🤪');

    let table = document.querySelector('.table');
    expect(table).toBeInTheDocument();

    let rows = table?.querySelectorAll('.table--row');
    expect(rows?.length).toBe(2);

    await userEvent.selectOptions(selectElement, 'no filter');

    table = document.querySelector('.table');
    expect(table).toBeInTheDocument();

    rows = table?.querySelectorAll('.table--row');
    expect(rows?.length).toBe(7);

    await userEvent.selectOptions(selectElement, '🗣');

    table = document.querySelector('.table');
    expect(table).toBeInTheDocument();

    rows = table?.querySelectorAll('.table--row');
    expect(rows?.length).toBe(3);
  });
});
