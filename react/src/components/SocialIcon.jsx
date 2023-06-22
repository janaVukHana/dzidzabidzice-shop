import './SocialIcon.css'
import * as React from 'react';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function SocialIcon() {
  return (
    <div className='SocialIcon'>
      <a href="#" target='_blank'>
        <InstagramIcon />
      </a>
      <a href="#" target='_blank'>
        <FacebookIcon />
      </a>
    </div>
  )
}