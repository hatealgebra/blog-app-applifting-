import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';
import Button from './Button';
import MenuButton from './MenuButton';
import ButtonSort from './ButtonSort';

export const StandardButtons = () => (
  <>
    <Button colortheme="primary" onClick={() => action('Button clicked')}>
      Primary
    </Button>
    <Button onClick={() => action('Button clicked')} colortheme="secondary">
      Secondary
    </Button>
  </>
);

export const OutlineButtons = () => (
  <>
    <Button variant="outline" onClick={() => action('Button clicked')}>
      Primary
    </Button>
    <Button
      variant="outline"
      colortheme="secondary"
      onClick={() => action('Button clicked')}
    >
      Secondary
    </Button>
  </>
);

export const LargeStandardButtons = () => (
  <>
    <Button
      size="lg"
      colortheme="primary"
      onClick={() => action('Button clicked')}
    >
      Primary
    </Button>
    <Button
      size="lg"
      onClick={() => action('Button clicked')}
      colortheme="secondary"
    >
      Secondary
    </Button>
  </>
);
export const LargeOutlineButtons = () => (
  <>
    <Button
      size="lg"
      colortheme="primary"
      variant="outline"
      onClick={() => action('Button clicked')}
    >
      Primary
    </Button>
    <Button
      size="lg"
      onClick={() => action('Button clicked')}
      colortheme="secondary"
      variant="outline"
    >
      Secondary
    </Button>
  </>
);
export const SmallStandardButtons = () => (
  <>
    <Button
      size="sm"
      colortheme="primary"
      onClick={() => action('Button clicked')}
    >
      Primary
    </Button>
    <Button
      size="sm"
      onClick={() => action('Button clicked')}
      colortheme="secondary"
    >
      Secondary
    </Button>
  </>
);
export const SmallOutlineButtons = () => (
  <>
    <Button
      size="sm"
      colortheme="primary"
      variant="outline"
      onClick={() => action('Button clicked')}
    >
      Primary
    </Button>
    <Button
      size="sm"
      onClick={() => action('Button clicked')}
      colortheme="secondary"
      variant="outline"
    >
      Secondary
    </Button>
  </>
);
export const BlockButton = () => (
  <div style={{ maxWidth: '200px', width: '100%' }}>
    <Button onClick={() => action('Button clicked!')} isBlock>
      Block Button
    </Button>
  </div>
);

export const MenuButtonExample = () => (
  <MenuButton onClick={() => action('Menu button clicked!')} />
);

export const SortButtonAllVariants = () => (
  <>
    <ButtonSort dispatchSort={action('Clicked')}>Article Title</ButtonSort>
    <ButtonSort dispatchSort={action('Clicked')} isActive>
      Article Title Active
    </ButtonSort>
  </>
);

export default {
  component: Button,
  subcomponents: { MenuButtonExample },
  title: 'Atoms/Button',
  decorators: [
    (Story) => (
      <div style={{ margin: '1em', display: 'flex', gap: '20px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Button | typeof MenuButtonExample>;
