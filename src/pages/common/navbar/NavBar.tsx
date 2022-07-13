/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
    useContext,
    useState
} from 'react';
import styled, {
    ThemeContext
} from 'styled-components';
import {
    Link as ReactRouterDomLink,
    useLocation
} from 'react-router-dom';
import { Toggle } from 'pages/common';

const HeaderWrapper = styled.header`
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    display: block;
    padding: 0 16px;
    top: 0;
    background-image: linear-gradient(to right, ${p => p.theme.colors.primaryColor}, ${p => p.theme.colors.secondaryColor});
    border-bottom: 3px solid ${p => p.theme.colors.secondaryColor};
`;

const Menu = styled.nav<any>`
    position: fixed;
    width: 100%;
    height: 10vh;
    left: 0;
    padding: 0;
    box-sizing: border-box;
    /* background-color: ${(p: any) => p.theme.colors.navBar.primaryColor}; */
    div{
        position: fixed;
        top: 9vh;
        background-color: ${p => p.theme.colors.navBar.secondaryColor};
        display: ${p => p.open ? 'block' : 'none'};
    }
    
    @media(min-width: 768px){
        display: fixed;
        background: none;
        left: initial;
        top: initial;
        margin: auto 0 auto auto;
        /* background-color: ${(p: any) => p.theme.colors.navBar.primaryColor}; */
        div{
            position: fixed;
            top: 3vh;
            background-color: transparent;
            display: ${p => p.open ? 'block' : 'none'};     
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Link = ({ isActive, children, ...props }: any) => {
    return (
        <ReactRouterDomLink {...props}>
            {children}
        </ReactRouterDomLink>
    )
}

const StyledLink = styled(Link)`
    padding: 4px 8px;
    display: block;
    text-align: center;
    box-sizing: border-box;
    margin: auto 0;
    font-weight: ${(props) => props.isActive ? 'bold' : 'normal'};
    color: ${p => p.theme.colors.bodyFontColor};
    text-decoration: none;

    &:hover{
        cursor: pointer;
        font-weight: bold;
        color: blue;
    }

    @media(min-width: 768px){
        display: inline-block;
    }
`
const MobileMenuIcon = styled.div<any>`
    margin: auto 0 auto auto;
    width: 25px;
    min-width: 35px;
    padding: 5px;
    position: absolute;
    display: block;
    z-index: 10;
    top: 1vh;
    right: 2vw;
    div{
        height: 3px;
        background-color: white;
        border: 1px solid black;
        margin: 5px 0;
        width: 100%;
    }
    @media(min-width: 768px){
        display: none;
    }
`;

export const NavBar = () => {
    const x = window.matchMedia("(min-width: 768px)");
    const resizedWindow = (x: any) => {
        setIsOpen(x.matches)
    }

    x.addEventListener('change', resizedWindow);

    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(x.matches);
    const { id, setTheme } = useContext(ThemeContext);

    return (
        <HeaderWrapper>
            <MobileMenuIcon onClick={() => setIsOpen(isOpen => !isOpen)}>
                <div />
                <div />
                <div />
            </MobileMenuIcon>
            <Menu id='mainBar' title='mainBar' open={isOpen}>
                <div>
                    <StyledLink to="/" isActive={pathname === '/'}>Home</StyledLink>
                </div>
            </Menu>
            <Toggle isActive={id === 'dark'} onToggle={setTheme} />
        </HeaderWrapper>
    )
};