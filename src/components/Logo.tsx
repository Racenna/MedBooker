import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <Image
      src="/assets/icons/logo-full-dark.svg"
      alt="MedBook"
      height={40}
      width={200}
      className={clsx('h-8 w-fit', className)}
    />
  );
};

export default Logo;
