import {render, screen} from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  // Happy path: App renders and shows the home screen
  it('renders the home screen with branding text', () => {
    render(<App />);

    expect(screen.getByText('Money Journal')).toBeTruthy();
    expect(screen.getByText('Your personal finance companion')).toBeTruthy();
  });

  // Edge case: Verify accessibility labels are present
  it('renders with correct accessibility attributes', () => {
    render(<App />);

    const title = screen.getByText('Money Journal');
    // The title should have a header accessibility role
    expect(title.props.accessibilityRole).toBe('header');
  });

  // Edge case: Verify the home screen container has a testID
  it('renders the home screen container with testID', () => {
    render(<App />);

    expect(screen.getByTestId('home-screen')).toBeTruthy();
  });

  // Failure case: Snapshot test to detect unintended UI regressions
  it('matches the snapshot', () => {
    const tree = render(<App />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
