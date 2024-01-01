import React from 'react';
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native-simple-toast', () => ({
  SHORT: jest.fn(),
}));

import LogIn from './LogIn';
import {fireEvent, render} from '@testing-library/react-native';

describe('Login Screen', () => {
  it('It should go to Login Screen', () => {
    const navigation = {navigation: () => {}};
    // spyOn(navigation, 'navigate');
    const page = render(<LogIn navigation={navigation} />);

    const loginBtn = page.getByTestId('LoginBtn');
    fireEvent.press(loginBtn);
    expect(navigation.navigate).toHaveBeenCalledWith('Home');
  });
});
