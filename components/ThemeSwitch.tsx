import React from "react";
import {useColorMode} from "theme-ui";
import styled from "@emotion/styled";
import theme from "../theme";

const ThemeSwitch: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode()

  const text = (mode: string) => colorMode === 'light' ? '🌞️' : '🌙'
  return (
    <ThemeButton
      onClick={
        () => setColorMode(colorMode === 'light' ? 'dark' : 'light')
      }>{text(colorMode)}
    </ThemeButton>
  )
}


const ThemeButton = styled.button`
  display: inline-block;
  text-align: center;
  width: 1.5rem;
  height: 1.5rem;
  font-size: ${theme.fontSizes[1]}px;
  border-radius: 10%;
`

export default ThemeSwitch
