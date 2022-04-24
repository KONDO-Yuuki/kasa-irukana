import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {Main as _Main} from './Main';
// import StorybookUI from '../storybook';

let Main = _Main;
// storybook利用時にコメントアウトする
// Main = StorybookUI;

export const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Main />
      </ApplicationProvider>
    </>
  );
};
