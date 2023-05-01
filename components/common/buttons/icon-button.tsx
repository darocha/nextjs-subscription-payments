import styles from './icon-button.module.css';
import { FC } from 'react';

type Props = {
  children?: any;
  className?: string;
  rest?: any;
};

export const IconButton: FC<Props> = ({
  children = undefined,
  className = '',
  ...rest
}) => {
  return (
    <div
      className={`${styles.iconButton} icon-button cursor-default w-10 h-10 mx-2 text-gray-300 flex-1 hover:border-gray-500 flex rounded-full items-center justify-center overflow-hidden ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
