import { ReactNode } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface BtnTimerProps {
  hide?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className: string;
}

interface BtnTimer {
  hide?: boolean;
}

const StyledBtn = styled.button<BtnTimer>`
  display: ${({ hide }) => (hide ? 'none' : 'block')};
`;

export function BtnTimer(props: BtnTimerProps) {
  return <StyledBtn {...props}>{props.children}</StyledBtn>;
}

export default BtnTimer;
