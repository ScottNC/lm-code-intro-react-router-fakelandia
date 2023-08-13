import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import 'jest-fetch-mock';
import { ConfessionForm } from '../ConfessionForm';
import userEvent from '@testing-library/user-event';
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

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('button should enable when form is filled in', async () => {

    await act(async () => {
      render(
        <MemoryRouter>
          <ConfessionForm />
        </MemoryRouter>
      );
    });

    const subject = screen.getByTestId('Subject');
    await userEvent.type(subject, 'hello');

    const details = screen.getByTestId('Details');
    await userEvent.type(details, 'blah blah blah');

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should send correct query when user wants to talk', async () => {

    await act(async () => {
      render(
        <MemoryRouter>
          <ConfessionForm />
        </MemoryRouter>
      );
    });

    const subject = screen.getByTestId('Subject');
    await userEvent.type(subject, 'hello');

    const reason = screen.getByTestId('Reason');
    await userEvent.selectOptions(reason, 'I just want to talk');

    const details = screen.getByTestId('Details');
    await userEvent.type(details, 'blah blah blah');

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();

    await userEvent.click(button);

    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/confess', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subject : 'hello', reason : 'just-talk', details: 'blah blah blah' })
    });
  });

  it('should send correct query when user wants to talk', async () => {

    await act(async () => {
      render(
        <MemoryRouter>
          <ConfessionForm />
        </MemoryRouter>
      );
    });

    const subject = screen.getByTestId('Subject');
    await userEvent.type(subject, 'hello');

    const reason = screen.getByTestId('Reason');
    await userEvent.selectOptions(reason, 'Not Eating Your Vegetables 🥗');

    const details = screen.getByTestId('Details');
    await userEvent.type(details, 'blah blah blah');

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();

    await userEvent.click(button);

    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/confess', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subject : 'hello', reason : 'vegetables', details: 'blah blah blah' })
    });
  });
});