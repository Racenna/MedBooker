import React from 'react';
import { render, screen } from '@testing-library/react';

import Logo from '@/components/Logo';

test('renders the Logo', () => {
  render(<Logo />);
  expect(screen.getByAltText('MedBook')).toBeInTheDocument();
});
