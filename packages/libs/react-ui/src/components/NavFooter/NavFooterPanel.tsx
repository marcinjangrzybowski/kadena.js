import type { FC, FunctionComponentElement } from 'react';
import React from 'react';
import { footerPanel } from './NavFooter.css';
import type { INavFooterIconButtonProps } from './NavFooterIconButton';
import type { INavFooterLinkProps } from './NavFooterLink';

export interface INavFooterPanelProps {
  children: FunctionComponentElement<
    INavFooterLinkProps | INavFooterIconButtonProps
  >[];
}

export const NavFooterPanel: FC<INavFooterPanelProps> = ({ children }) => {
  return (
    <div className={footerPanel} data-testid="kda-footer-panel">
      {children}
    </div>
  );
};
