import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

const StyledModalBackground = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #979797;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  z-index: 9;
`;

const StyledModalContentWrapper = styled.div<{ $isOpen: boolean }>`
  transform: translateY(${(props) => (props.$isOpen ? "0" : "-50vh")})
    scale(${(props) => (props.$isOpen ? "1" : "0.3")});
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
  return createPortal(
    <StyledModalBackground $isOpen={isOpen} onClick={() => setIsOpen(false)}>
      <StyledModalContentWrapper onClick={(e) => e.stopPropagation()} $isOpen={isOpen}>
        {children}
      </StyledModalContentWrapper>
    </StyledModalBackground>,
    document.getElementById("root")!
  );
};

export default Modal;
