import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import React from 'react';

import {Button} from 'react-native';

storiesOf('Button', module).add('with text', () => (
  <Button
    onPress={action('clicked-text')}
    title="Learn More"
    color="#841584"
    accessibilityLabel="Learn more about this purple button"
  />
));
