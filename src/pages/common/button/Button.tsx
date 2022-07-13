import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

const buttonType: any = {
    "success": (p: any) => p.theme.colors.success,
    "error": (p: any) => p.theme.colors.error,
    "info": (p: any) => p.theme.colors.info,
    "warning": (p: any) => p.theme.colors.warning,
}

const StyledButton = styled.button<any>`
    background-color: transparent;
    color: ${p => p.theme.colors.bodyFontColor};
    font-size: 1.5rem;
    padding-bottom: 0.5vh;
    padding-top: 0.5vh;
    margin-bottom: 1vh;
    margin-top: 1vh;
    margin-left: 1vh;
    margin-right: 1vh;
    border: 2px solid ${p => buttonType[p.type] ? buttonType[p.type](p) : null};

    &:hover {
        background-color: ${p => buttonType[p.type] ? buttonType[p.type](p) : null};
        color: white;
        cursor: pointer;
    }
`;

export const Button = ({ children, ...props }: any) => {
    useContext(ThemeContext);
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
};