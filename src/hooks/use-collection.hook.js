import { useEffect, useState } from 'react'
import { mutate, query, tx } from "@onflow/fcl"
import { CHECK_COLLECTION } from '../flow/check-collection.script';
import { CREATE_COLLECTION } from '../flow/create-collection.tx';
import { DELETE_COLLECTION } from '../flow/delete-collection.tx';

export default function useCollection(user) {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState(false);

  useEffect(() => {
    if (!user?.addr) return
    const checkCollection = async () => {
      try {
        // eslint-disable-next-line
        let res = await query ({
          cadence: CHECK_COLLECTION,
          args: (arg, t) => [arg(user?.addr, t.Address)]
        });
        setCollection(res);
        console.log(res);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    checkCollection();
    // eslint-disable-next-line
  }, []);

  const createCollection = async () => {
    try{
      let res = await mutate({
        cadence: CREATE_COLLECTION,
        limit: 55,
      });
      await tx(res).onceSealed();
      console.log("funciono el cadence")
      setCollection(true);
    } catch (err) {
      console.log(err);
      console.log("pete en el cadence")
      setLoading(false);
    }
  }

  const deleteCollection = async () => {
    try {
      let res = await mutate({
        cadence: DELETE_COLLECTION,
        limit: 75,
      });
      await tx(res).onceSealed();
      setCollection(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    setCollection(false)
    window.location.reload()
  }

  return {
    loading,
    collection,
    createCollection,
    deleteCollection
  }
}
