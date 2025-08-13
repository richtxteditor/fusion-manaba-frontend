
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorPage from './ErrorPage';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

// Mock the useRouteError hook from react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useRouteError: vi.fn(),
        isRouteErrorResponse: vi.fn(),
    };
});

describe('ErrorPage', () => {
  it('renders the default error message for unknown errors', () => {
    // Arrange
    vi.mocked(useRouteError).mockReturnValue(null);
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);

    // Act
    render(<ErrorPage />);

    // Assert
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.getByText('An unknown error occurred')).toBeInTheDocument();
  });

  it('renders the error message from a RouteErrorResponse', () => {
    // Arrange
    const routeError = { status: 404, statusText: 'Not Found' };
    vi.mocked(useRouteError).mockReturnValue(routeError);
    vi.mocked(isRouteErrorResponse).mockReturnValue(true);

    // Act
    render(<ErrorPage />);

    // Assert
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('renders the error message from a standard Error object', () => {
    // Arrange
    const error = new Error('Something went wrong');
    vi.mocked(useRouteError).mockReturnValue(error);
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);

    // Act
    render(<ErrorPage />);

    // Assert
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders the error message when the error is a string', () => {
    // Arrange
    const error = 'A simple error message';
    vi.mocked(useRouteError).mockReturnValue(error);
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);

    // Act
    render(<ErrorPage />);

    // Assert
    expect(screen.getByText('A simple error message')).toBeInTheDocument();
  });
});
