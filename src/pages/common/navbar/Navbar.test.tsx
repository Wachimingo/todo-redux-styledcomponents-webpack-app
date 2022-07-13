import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { NavBar } from './NavBar';

test('Navbar renders in page', () => {
    render(<NavBar />);
    screen.getByRole('navigation', { name: 'mainBar' });
})