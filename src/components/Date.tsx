import { parseISO, format } from 'date-fns'
import React from "react";

interface Props {
  dateString: string
}

const Date: React.FC<Props> = ({ dateString }) => {
  try {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, 'yyyy年M月d日')}</time>
  } catch {
    return <time />
  }
}

export default Date
