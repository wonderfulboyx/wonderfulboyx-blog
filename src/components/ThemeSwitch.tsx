import React from "react";
import {useColorMode} from "theme-ui";
import styled from "@emotion/styled";
import theme from "../theme";


interface Props {
  className?: string
  colorMode: string
  setColorMode: (mode: string) => void
}

const Component: React.FC<Props> = ({className, colorMode, setColorMode}) => {
  const text = colorMode === 'light' ? '🌞️' : '🌙'
  const toggleColorMode = () => setColorMode(colorMode === 'light' ? 'dark' : 'light')
  return (
    <div className={className}>
      <button
        onClick={toggleColorMode}>
        {text}
      </button>
    </div>
  )
}


const StyledComponent = styled(Component)`
& button {
  display: inline-block;
  text-align: center;
  width: 1.5rem;
  height: 1.5rem;
  font-size: ${theme.fontSizes[1]}px;
  border-radius: 10%;
}
`

const ContainerComponent:React.FC = () => {
  const [colorMode, setColorMode] = useColorMode()
  return (<StyledComponent colorMode={colorMode} setColorMode={setColorMode}/>)
}

const ThemeSwitch = ContainerComponent

export default ThemeSwitch
