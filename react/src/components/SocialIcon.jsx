import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  {
    icon: <InstagramIcon />,
    name: 'Instagram',
    url: 'https://www.google.com',
  },
  {
    icon: <FacebookIcon />,
    name: 'Facebook',
    url: 'https://www.blic.rs',
  },
];

export default function PlaygroundSpeedDial() {
  const [direction, setDirection] = React.useState('left');
  const [hidden, setHidden] = React.useState(false);

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Box sx={{ position: 'relative', mt: 3, height: 50 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={hidden}
          icon={<SpeedDialIcon />}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleClick(action.url)}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}
