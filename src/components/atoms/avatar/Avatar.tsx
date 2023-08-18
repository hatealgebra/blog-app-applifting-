import React from 'react';

import { StyledAvatar } from './avatar.styled';
import avatarGeneric from '../../../images/avatar-fallback.png';

const Avatar = ({ size = 'lg', src, alt }: AvatarProps) => {
  return (
    <StyledAvatar
      className="avatar"
      size={size}
      src={src || avatarGeneric}
      alt={alt || 'fallback user avatar'}
    />
  );
};

export interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  src?: string;
  alt?: string;
}

export default Avatar;
