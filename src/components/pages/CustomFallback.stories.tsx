import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {action} from '@storybook/addon-actions';
import {CustomFallback} from './CustomFallback';

storiesOf('CustomFallback', module).add('on crashed', () => (
  <CustomFallback resetError={action('reset error')} />
));
