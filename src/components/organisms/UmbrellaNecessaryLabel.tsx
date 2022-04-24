import React from 'react';
import {Text} from '@ui-kitten/components';
import {UmbrellaNecessaryState} from '../../features/forecasts';

export const UmbrellaNecessaryLabel: React.FC<{
  umbrellaNecessary: UmbrellaNecessaryState;
}> = ({umbrellaNecessary}) => {
  switch (umbrellaNecessary) {
    case 'NECESSARY': {
      return (
        <Text category="s2" status="danger">
          {'傘が必要です'}
        </Text>
      );
    }
    case 'MAYBE': {
      return (
        <Text category="s2" status="warning">
          {'折りたたみ傘を忘れずに'}
        </Text>
      );
    }
    case 'UNNECESSARY': {
      return (
        <Text category="s2" status="primary">
          {'傘は不要です'}
        </Text>
      );
    }
    case 'UNKNOWN': {
      return (
        <Text category="s2" status="basic">
          {'不明'}
        </Text>
      );
    }
  }
};
