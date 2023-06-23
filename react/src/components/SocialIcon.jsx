import './SocialIcon.css'
import * as React from 'react';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function SocialIcon() {
  return (
    <div className='SocialIcon'>
      <a href="https://www.instagram.com/dzidzabidzice/" target='_blank'>
        <InstagramIcon />
      </a>
      <a href="https://www.facebook.com/dzidzabidzice021/" target='_blank'>
        <FacebookIcon />
      </a>
    </div>
  )
}