export interface ButtonProps {
  colortheme?: 'primary' | 'secondary';
  variant?: 'standard' | 'outline' | 'block';
  onClick?: (e?: React.MouseEvent<HTMLElement> | MouseEvent) => void;
  children: any;
  size?: 'sm' | 'md' | 'lg';
  isBlock?: boolean;
  type?: 'submit' | 'button';
}

export interface MenuButtonProps {
  onClick: () => void;
}
