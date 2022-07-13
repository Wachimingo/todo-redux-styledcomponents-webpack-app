import React from 'react';
import styled from 'styled-components';
import { ReactPortal } from 'pages/common';

const ModalWrapper = styled.div<any>`
  display: ${p => p.isOpen ? 'block' : 'none'}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

const ModalContent = styled.div`
    background-color: ${p => p.theme.id === 'light' ? 'white' : p.theme.colors.navBar.secondaryColor};
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
`

const CloseButton = styled.span<any>`
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    &:hover{
        cursor: pointer;
    }
    &:focus{
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

`

export const Modal = ({ children, isOpen, closeModal, wrapperId = 'default', ...props }) => {
    if (!isOpen) return null;
    /**
     * If the target of the event is the modal, remove the event listener and close the modal.
     * @param {any} event - any - the event that is passed to the function
     */
    function closeWhenClickOutside(event: Event) {
        if (event.target == document.getElementById(`${wrapperId}-modal`)) {
            window.removeEventListener('click', closeWhenClickOutside);
            closeModal(false);
            if (props.reset) {
                props.reset({
                    title: '',
                    body: ''
                });
            }
        }
    }
    window.addEventListener('click', closeWhenClickOutside);
    return (
        <ReactPortal wrapperId={wrapperId}>
            <ModalWrapper isOpen id={`${wrapperId}-modal`}>
                <ModalContent>
                    <CloseButton onClick={() => closeModal(false)}>
                        &times;
                    </CloseButton>
                    {children}
                </ModalContent>
            </ModalWrapper>
        </ReactPortal>
    )
}