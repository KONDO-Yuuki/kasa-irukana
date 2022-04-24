/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Navigator} from '../src/Navigator';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Navigator />);
});
