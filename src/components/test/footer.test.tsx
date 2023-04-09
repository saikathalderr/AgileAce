import Footer from '../footer';
import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';

describe('footer.tsx', () => {
  test('Load and display right content', () => {
    render(<Footer />);

    expect(screen.getByRole('heading')).toHaveTextContent(
      'Made with React, TypeScript, Socket.io & ❤️ by Saikat Halder - available on GitHub'
    );
  });
});
