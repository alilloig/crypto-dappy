import React from 'react'
import DappyList from '../components/DappyList'
import Header from '../components/Header'
import { useUser } from '../providers/UserProvider'


export default function Market() {
  const { collection, createCollection, deleteCollection, userDappies } = useUser()

  return (
    <>
      <Header
        title={<>Dappy<span className="highlight">Market</span></>}
        subtitle={<>Here you can trade the <span className="highlight">Dappies</span> you have collected and get new ones</>}
      />

      {!collection ?
        <div className="btn btn-round" onClick={() => createCollection()}>Enable Collection</div> :
        <>
          <DappyList dappies={userDappies} />
          <div className="btn btn-round" onClick={() => deleteCollection()}>Delete Collection</div>
        </>
      }
    </>
  )
}
