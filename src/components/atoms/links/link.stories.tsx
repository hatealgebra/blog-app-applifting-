import React from 'react';

import Link from './link.styled';
import LoginLink from './LoginLink';

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Link to="/#">Classic link</Link>
    <Link variant="text" to="/#">
      Text link
    </Link>
    <LoginLink />
  </div>
);

export default {
  component: Link,
  subcomponent: { LoginLink },
  title: 'Atoms/Link',
};
