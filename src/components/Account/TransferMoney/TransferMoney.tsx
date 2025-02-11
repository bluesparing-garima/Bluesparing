import React from 'react'
import TDSWrapper from '../TDS/TDSWrapper'
import TransferMoneyFrom from './TransferMoneyFrom'

const TransferMoney = () => {
  return (
    <TDSWrapper title="Transfer Amount">
        <TransferMoneyFrom/>
    </TDSWrapper>
  )
}

export default TransferMoney