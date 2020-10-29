/** @jsx jsx */
import {jsx} from "theme-ui";
import React from "react";
import theme from "../theme";
import {Property} from "csstype";
import styled from "@emotion/styled";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";


const Navbar: React.FC = () => {
  return (
    <nav css={`
        background: ${theme.colors.headerBg};
        display: flex;
        align-items: center;
        padding: .5rem;
      `}>
      <Link href={'/'}>
        <a>
          <CircleIcon size={'2rem'}/>
        </a>
      </Link>
      <MenuList>
        <li>
          <Link href={'/'}>
            <MenuItemLink>articles</MenuItemLink>
          </Link>
        </li>
      </MenuList>
      <div css={`
        margin-left: auto;
        margin-right: 16px;
      `}>
        <ThemeSwitch/>
      </div>
    </nav>
  )
}

const CircleIcon: React.FC<{ size: Property.Height }> = ({size}) => (
  <img css={`
    height: ${size};
    width: ${size};
  `} src="/favicon.ico" alt=""/>
)

const MenuList = styled.ul`
  display: flex;
  li      { margin-left: 1rem; }
  li + li { margin-left: .5rem; }
`

const MenuItemLink = styled.a`
  color: ${theme.colors.headerText};
  text-decoration: underline;
  cursor: pointer;
  :hover {
    text-decoration: none;
  }
`

export default Navbar
