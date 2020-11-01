import * as React from "react";
import {Property} from "csstype";

interface Props{
  size: Property.Height | Property.Width,
  src: string,
}

const CircleImg: React.FC<Props> = (props) => {
  const {size, src} = props
  return (
    <img height={size} width={size} src={src}/>
  )
}

export default CircleImg
