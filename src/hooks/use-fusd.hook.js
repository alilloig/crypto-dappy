import { CHECK_FUSD_BALANCE } from "../flow/check-fusd-balance.script";
import { CREATE_FUSD_VAULT } from "../flow/create-fusd-vault.tx";
import { mutate, query, tx } from '@onflow/fcl';
import { useEffect, useReducer } from 'react'
import { defaultReducer } from '../reducer/defaultReducer'

export default function useFUSD(user) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null,
  })

  useEffect(() => {
    getFUSDBalance();
    // eslint-disable-next-line
  }, [])

  const getFUSDBalance = async () => {
    dispatch({ type: 'PROCESSING' });
    try {
      let response = await query ({
        cadence: CHECK_FUSD_BALANCE,
        args: (arg, t) => [arg(user?.addr, t.Address)]
      });
      dispatch({ type: 'SUCCESS', payload: response })
    } catch (err) {
      dispatch({ type: 'ERROR' })
      console.log(err)
    }
  }

  const createFUSDVault = async () => {
    dispatch({ type: 'PROCESSING' })
    try {
      let transaction = await mutate ({
        cadence: CREATE_FUSD_VAULT
      });
      await tx(transaction).onceSealed();
      dispatch({type: 'SUCCESS'});
    } catch (err) {
      dispatch({ type: 'ERROR'});
      console.log("mal el cadence")
    }
  }

  return {
    ...state,
    createFUSDVault,
    getFUSDBalance,
  }
}
