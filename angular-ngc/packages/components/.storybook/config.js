import { configure, addParameters } from '@storybook/angular';
import { create } from '@storybook/theming';
import logo from '../src/storybook-assets/primary-logo-medium.png';

const theme = create({
  brandImage: logo,
});

addParameters({
  options: {
    theme,
  },
});

configure(
  require.context('../src/stories', true, /\.stories\.(ts|mdx)$/),
  module
);
