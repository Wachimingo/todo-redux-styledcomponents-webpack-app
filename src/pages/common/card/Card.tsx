import React, { memo, useMemo } from 'react';
import styled from 'styled-components';

const HeaderSlot = ({ children }: any) => {
    return (
        <>
            {children}
        </>
    )
}
const BodySlot = ({ children }: any) => {
    return (
        <>
            {children}
        </>
    )
}
const ButtonSlot = ({ children }: any) => {
    return (
        <>
            {children}
        </>
    )
}

/* A function that returns a color based on the state of the card. */
const spanColor: any = {
    "new": (p: any) => p.theme.colors.states.new,
    "pending": (p: any) => p.theme.colors.states.pending,
    "cancel": (p: any) => p.theme.colors.states.pending,
    "In progress": (p: any) => p.theme.colors.states.inProgress,
    "completed": (p: any) => p.theme.colors.states.completed
}

const CardWrapper = styled.div<any>`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 95vw;
    margin: 1rem;
    background-color: ${p => p.theme.id === 'light' ? 'white' : p.theme.colors.navBar.secondaryColor};
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
    span{
        color: ${p => spanColor[p.state] ? spanColor[p.state](p) : ''};
    }
    @media(min-width: 768px){
        display: inline-block;
        margin: 1rem;
        width: 45vw;
    }
`;

const InnerContainer = styled.div<any>`
    padding: 2px 16px;
`;

const ButtonContainer = styled(ButtonSlot)`
    position: relative;
    left: 0;
    /* border: 1px solid black; */
    width: fit-content;
`

export const Card = memo(({ children, ...props }: any) => {
    const headerChildren = useMemo(() => children.filter((x: any) => { return x.props.slot === 'header' }), [children])
    const bodyChildren = useMemo(() => children.filter((x: any) => { return x.props.slot === 'body' }), [children])
    const buttonChildren = useMemo(() => children.filter((x: any) => { return x.props.slot === 'button' }), [children])
    return (
        <CardWrapper {...props}>
            <InnerContainer>
                <HeaderSlot>
                    {headerChildren}
                </HeaderSlot>
                <BodySlot>
                    {bodyChildren}
                </BodySlot>
                <ButtonContainer>
                    {buttonChildren}
                </ButtonContainer>
            </InnerContainer>
        </CardWrapper>
    )
});