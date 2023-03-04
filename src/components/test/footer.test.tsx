import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../footer';

describe('footer.tsx', () => {
  test('Load and display right content', () => {
    render(<Footer />);

    expect(screen.getByRole('heading')).toHaveTextContent(
      'Made with React, TypeScript, Socket.io & ❤️ by Saikat Halder - available on GitHubbbb'
    );
  });
});
