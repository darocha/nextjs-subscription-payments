import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { FC } from 'react';

type ButtonGroupProps = {
  onClick: (selected: number) => void;
  selected: number;
};

export const ButtonGroup: FC<ButtonGroupProps> = ({
  onClick,
  selected = 1
}) => {
  const handleClick = (selected: number) => {
    if (onClick) onClick(selected);
  };
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        onClick={() => handleClick(1)}
        type="button"
        className={`${
          selected === 1 ? 'bg-gray-600' : 'bg-gray-900'
        } inline-flex items-center border-gray-900 px-4 py-2 text-sm font-medium text-gray-400 border  rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`}
      >
        <TableRowsIcon className="w-4 h-4 mr-2 fill-current" />
        List
      </button>
      <button
        onClick={() => handleClick(2)}
        type="button"
        className={`${
          selected === 2 ? 'bg-gray-600' : 'bg-gray-900'
        } inline-flex items-center border-gray-900 px-4 py-2 text-sm font-medium text-gray-400  border-t border-b  hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`}
      >
        <ViewModuleIcon className="w-4 h-4 mr-2 fill-current" />
        Gallery
      </button>
      <button
        onClick={() => handleClick(3)}
        type="button"
        className={`${
          selected === 3 ? 'bg-gray-600 ' : 'bg-gray-900'
        } inline-flex items-center border-gray-900 px-4 py-2 text-sm font-medium text-gray-400 border  rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`}
      >
        <ViewCompactIcon className="w-4 h-4 mr-2 fill-current" />
        Full
      </button>
    </div>
  );
};
