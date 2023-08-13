import { act, render } from '@testing-library/react';
import { MisdemeanourTable } from '../MisdemeanourTable';
import { MemoryRouter } from 'react-router-dom';

import 'jest-fetch-mock';
global.fetch = require('jest-fetch-mock');

describe('MisdemeanourTable', () => {

  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => ({
          misdemeanours: [
            {
              citizenId: 1,
              misdeamanour: 'united',
              date: '01/01/2000'
            },
            {
              citizenId: 2,
              misdeamanour: 'lift',
              date: '01/01/2000'
            },
            {
              citizenId: 3,
              misdeamanour: 'lift',
              date: '01/01/2000'
            },
            {
              citizenId: 4,
              misdeamanour: 'vegetables',
              date: '01/01/2000'
            },
            {
              citizenId: 5,
              misdeamanour: 'vegetables',
              date: '01/01/2000'
            },
            {
              citizenId: 6,
              misdeamanour: 'rudeness',
              date: '01/01/2000'
            },
          ]
      })
    });
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('calls fetch when component is rendered', async () => {
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
  });
});
