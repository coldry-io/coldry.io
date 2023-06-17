import { render, screen } from '@/tests/test-utils';

import { Input } from '.';

describe('Input', () => {
  it('should render text input', () => {
    render(<Input type="text" placeholder="Text Input" />);

    // TEST: Input should be a text input
    screen.getByPlaceholderText('Text Input');
    screen.getByRole('textbox');
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    expect(screen.getByRole('textbox')).not.toHaveAttribute('disabled');
  });

  it('should render disabled text input', () => {
    render(<Input type="text" placeholder="Text Input Disabled" disabled={true} />);

    // TEST: Input should be a text input and disabled
    screen.getByPlaceholderText('Text Input Disabled');
    screen.getByRole('textbox');
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    expect(screen.getByRole('textbox')).toHaveAttribute('disabled');
  });

  it('should render text input with error', () => {
    render(<Input type="text" placeholder="Text Input with Error" className="border-red-500" />);

    // TEST: Input should be a text input and have error class
    screen.getByPlaceholderText('Text Input with Error');
    screen.getByRole('textbox');
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    expect(screen.getByRole('textbox')).not.toHaveAttribute('disabled');
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });

  it('should render password input', () => {
    render(<Input type="password" placeholder="Password" />);

    // TEST: Input should be a password input
    screen.getByPlaceholderText('Password');
  });

  it('should render email input', () => {
    render(<Input type="email" placeholder="Email" />);

    // TEST: Input should be a email input
    screen.getByPlaceholderText('Email');
    screen.getByRole('textbox');
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    expect(screen.getByRole('textbox')).not.toHaveAttribute('disabled');
  });

  it('should render number input', () => {
    render(<Input type="number" placeholder="Number" />);

    // TEST: Input should be a number input
    screen.getByPlaceholderText('Number');
    screen.getByRole('spinbutton');
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
    expect(screen.getByRole('spinbutton')).not.toHaveAttribute('disabled');
  });
});

// export const Default: Story = {
//   render: () => <Input type="text" placeholder="Text Input" />
// };

// export const Disabled: Story = {
//   render: () => <Input type="text" placeholder="Text Input Disabled" disabled={true} />
// };

// export const Error: Story = {
//   render: () => <Input type="text" placeholder="Text Input with Error" className="border-red-500" />
// };

// export const Password: Story = {
//   render: () => <Input type="password" placeholder="Password" />
// };

// export const Email: Story = {
//   render: () => <Input type="email" placeholder="Email" />
// };

// export const Number: Story = {
//   render: () => <Input type="number" placeholder="Number" />
// };
