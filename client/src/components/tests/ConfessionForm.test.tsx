import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import 'jest-fetch-mock';
import { ConfessionForm } from '../ConfessionForm';
global.fetch = require('jest-fetch-mock');

describe('MisdemeanourTable', () => {

  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => ({ success: true, justTalked: true, message: 'Thanks for talking to us.' })
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Confession form should appear', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ConfessionForm />
        </MemoryRouter>
      );
    });

    const form = document.querySelector('.form');
    expect(form).toBeInTheDocument();

    const subject = screen.getByTestId('Subject');
    expect(subject).toBeInTheDocument();
    expect(subject.tagName.toLowerCase()).toBe('input');

    const reason = screen.getByTestId('Reason');
    expect(reason).toBeInTheDocument();
    expect(reason.tagName.toLowerCase()).toBe('select');

    const details = screen.getByTestId('Details');
    expect(details).toBeInTheDocument();
    expect(details.tagName.toLowerCase()).toBe('textarea');
  })
});