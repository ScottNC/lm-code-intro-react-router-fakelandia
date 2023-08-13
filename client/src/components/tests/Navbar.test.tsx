import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../Navbar';

describe('Navbar', () => {
	test('Home should link to /home', () => {	
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);

		const home = screen.getByText(/Home/i);
		expect(home).toHaveAttribute('href', '/home');
	});

  test('Home should link to /home', () => {	
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);

		const misdemeanour = screen.getByText(/Misdemeanours/i);
		expect(misdemeanour).toHaveAttribute('href', '/misdemeanour');
	});

  test('Confess should link to /confession', () => {	
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);

		const confession = screen.getByText(/Confess To Us/i);
		expect(confession).toHaveAttribute('href', '/confession');
	});
});
