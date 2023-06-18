import google from '@/public/images/google-logo.png';
import linkedin from '@/public/images/In-Blue-128@2x.png';
import logo from '@/public/logo.png';
import { ChevronLeft, Loader2, MailCheck, Menu, X, type Icon as LucideIcon } from 'lucide-react';
import Image from 'next/image';

export type Icon = LucideIcon;

export const Icons = {
  check: MailCheck,
  chevronLeft: ChevronLeft,
  close: X,
  hamburger: Menu,
  spinner: Loader2,

  Logo: ({ ...props }) => <Image src={logo} alt="Coldry Logo" priority {...props} />,
  LinkedIn: ({ ...props }) => <Image src={linkedin} alt="LinkedIn Logo" priority {...props} />,
  Google: ({ ...props }) => <Image src={google} alt="Google Logo" priority {...props} />
};
