import React from 'react';
import { createPortal } from 'react-dom';

export const CreatingPortalComponent = ({ children, isOpen, ...props }) => {
  return (
    isOpen &&
    createPortal(
      <>{React.cloneElement(children, { ...props, isOpen })}</>,
      document.querySelector('main'),
    )
  );
};
