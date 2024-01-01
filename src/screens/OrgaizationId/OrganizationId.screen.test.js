import React from 'react';
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native-simple-toast', () => ({
  SHORT: jest.fn(),
}));

import {fireEvent, render} from '@testing-library/react-native';
import OrgaizationId from './OrgaizationId';
import {Provider} from 'react-redux';
import {store} from '../../redux/store';

describe('It should go to Organization Id Screen', () => {
  it('It should show invalid input message', () => {
    // spyOn(navigation, 'navigate');
    const page = render(
      <Provider store={store}>
        <OrgaizationId />
      </Provider>,
    );

    page.queryByLabelText('Find an organization');
    const findOrgBtn = page.queryByTestId('findOrgBtn');

    fireEvent.press(findOrgBtn);
  });
  //   it('It show invalid input message', () => {
  //     const navigation = {navigation: () => {}};

  //     fireEvent.press(navigation('find'));
  //   });
});
