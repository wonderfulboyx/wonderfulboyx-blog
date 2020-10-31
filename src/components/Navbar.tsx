/** @jsx jsx */
import {jsx} from "theme-ui";
import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import CircleImg from "./CircleImg";

interface Props {
  className?: string
}

const Component: React.FC<Props> = (props) => {
  return (
    <div className={props.className}>
      <nav className='nav-bar'>
        <Link href={'/'}>
          <a>
            <CircleImg size={'20px'} src={'/favicon.ico'}/>
          </a>
        </Link>
        <ul className='menu-list'>
          <li>
            <Link href={'/'}>
              <a className='menu-item-link'>articles</a>
            </Link>
          </li>
        </ul>
        <div className='theme-switch-wrapper'>
          <ThemeSwitch/>
        </div>
      </nav>
    </div>
  )
}

const StyledComponent = styled(Component)`
& .nav-bar {
  background: #222;
  display: flex;
  align-items: center;
  padding: .5rem;
}

& .menu-list {
  display: flex;
  li      { margin-left: 1rem; }
  li + li { margin-left: .5rem; }
}

& .menu-item-link {
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
  :hover {
    text-decoration: none;
  }
}

& .theme-switch-wrapper {
  margin-left: auto;
  margin-right: 16px;
}
`

const ContainerComponent: React.FC = ({children}) => {
  return <StyledComponent>{children}</StyledComponent>
}

const Navbar = ContainerComponent

export default Navbar
