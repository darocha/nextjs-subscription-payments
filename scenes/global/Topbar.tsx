import Link from 'next/link';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '@/components/icons/Logo';
import ErrorMessage from '@/components/messages/error';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const onResize = useCallback(() => {
    if (ref.current) setHeight(ref.current.clientHeight);
  }, []);

  // useEffect(() => {
  //   window.addEventListener('resize', onResize);
  //   onResize();
  //   return () => {
  //     window.removeEventListener('resize', onResize);
  //   };
  // }, []);

  useEffect(() => {
    if (!ref.current) return; // wait for the elementRef to be available
    const resizeObserver = new ResizeObserver(() => {
      // Do what you want to do when the size of the element changes
      onResize();
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <>
      <div
        className="topbar-spacer flex min-h-[70px] w-full"
        style={{ minHeight: height ? `${height}px` : '' }}
      />
      <div ref={ref} className="fixed flex w-full flex-col z-[1100]">
        <ErrorMessage />

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2}
          sx={{
            background: '#141b2d',
            zIndex: 1100,
            position: 'relative',
            top: 0,
            width: '100%'
          }}
        >
          <Box width={'100%'} minWidth={'300px'} maxWidth={'300px'}>
            <Link href="/" className="logo" aria-label="Logo">
              <Logo />
            </Link>
          </Box>
          <Box width={'100%'} minWidth={'200px'}></Box>
          <Box display="flex" width={'100%'} className="justify-center">
            {/* SEARCH BAR */}
            <Box
              display="flex"
              height="auto"
              sx={{
                background: colors.primary[400],
                borderRadius: '3px',
                width: '500px'
              }}
            >
              <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
          {/* ICONS */}
          <Box width={'100%'} className="flex justify-end">
            <Box
              width={'100%'}
              maxWidth={'200px'}
              minWidth={'200px'}
              className="flex justify-between"
            >
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>
              <IconButton>
                <NotificationsOutlinedIcon />
              </IconButton>
              <IconButton>
                <SettingsOutlinedIcon />
              </IconButton>
              <IconButton>
                <PersonOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Topbar;
