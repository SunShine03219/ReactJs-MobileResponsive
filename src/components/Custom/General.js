import styled from "styled-components";

// Styled component named StyledButton
export const CustomButton = styled.button`
  width: ${props => props?.width}px;
  height: ${props => props?.height}px;    
  background-color: ${props => props?.background ? props.background : '#0A81A9'};
  font-size: ${props => props?.fontSize}px;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;


export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  width: 355px;
  height: 302px;
  text-align: center;
`;

export const CustomModalContent = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  text-align: center;
`;


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;