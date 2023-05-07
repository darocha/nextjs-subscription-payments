import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { Theme, useTheme } from '@mui/material/styles';
import { tokens } from '@/theme';
import { FC, useEffect } from 'react';

const BootstrapInput = styled(InputBase)(({ theme }) => {
  const colors = tokens(theme.palette.mode);

  return {
    'label + &': {
      zIndex: 1
    },
    '& .MuiInputBase-input': {
      border: `1px solid ${colors.dashboard.textField.border.default}`,
      borderRadius: 4,
      margin: 0,
      position: 'relative',
      fontSize: '0.8571428571428571rem',
      padding: '24px 12px 8px 12px',
      backgroundColor: colors.dashboard.textField.background.main,
      color: colors.dashboard.textField.color,
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow'
      ]),
      '&:hover': {
        backgroundColor: colors.dashboard.textField.background.darker
      },
      '&.Mui-error': {
        borderColor: colors.dashboard.textField.border.error.default
      },
      '&:focus': {
        backgroundColor: colors.dashboard.textField.background.darker,
        color: colors.dashboard.textField.color,
        borderRadius: 4
      }
    },
    '& .MuiSvgIcon-root.MuiSelect-icon': {
      right: '10px'
    }
  };
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];

function getStyles(option: string | number, value: string, theme: Theme) {
  return {
    fontWeight:
      value.indexOf(option.toString()) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

type StyledSelectProps = {
  label: string;
  options: string[] | number[];
  value: string | undefined;
  name: string;
  onChange: Function;
  gridColumn: string;
};

export const StyledSelect: FC<StyledSelectProps> = ({
  label = 'Name',
  options = names,
  value = '',
  name,
  onChange,
  gridColumn = 'span 4'
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = React.useState<string>('');
  const handleSelectChange = (event: { target: { value: string } }) => {
    setSelected(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, []);

  return (
    <FormControl
      sx={{
        gridColumn: gridColumn,
        //width: 300,
        color: colors.dashboard.textField.label.color,
        '& .MuiFormLabel-root.MuiInputLabel-root': {
          zIndex: 2,
          left: '12px',
          top: '-3px',
          '&.MuiFormLabel-filled, &:focus, &.Mui-focused': {
            transform: 'translate(0px, 10px) scale(0.75)'
          },
          color: colors.dashboard.textField.label.color,
          '&.Mui-error': {
            color: colors.dashboard.textField.border.error.default
          }
        }
      }}
      variant="standard"
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={selected}
        onChange={handleSelectChange}
        input={<BootstrapInput />}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            style={getStyles(option, selected, theme)}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
