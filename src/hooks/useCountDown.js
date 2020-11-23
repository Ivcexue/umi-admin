import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from 'antd'


const CountDown = (props) => {

  const intervalRef = useRef(null)

  const [count, changeCount] = useState(0)

  const { sendCodeMessage } = props

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (count === 59) {
      intervalRef.current = setInterval(() => {
        changeCount((preCount) => preCount - 1);
      }, 1000);
    } else if (count === 0) {
      clearInterval(intervalRef.current);
    }
  }, [count])

  const onGetCaptcha = useCallback(async () => {
    let status = await sendCodeMessage()
    if (status && status === 'success') {
      changeCount(59)
    }
  }, [sendCodeMessage])

  return (
    <Button type='Button' disabled={!!count} onClick={onGetCaptcha}>
      {count ? `${count}s重新获取` : '获取验证码'}
    </Button>
  )
}

export default CountDown