import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Title } from '../Title';

describe('Title', () => {
	test('renders form title', () => {	
		render(
			<MemoryRouter>
				<Title />
			</MemoryRouter>
		);

		const fakelandiaTitle = screen.getByText(/Fakelandia Justice Department/i);
		expect(fakelandiaTitle).toHaveAttribute('href', '/');
	});
	}
);
