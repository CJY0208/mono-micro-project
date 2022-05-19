import { createModel } from 'hox'
import { useLocalStorageState } from 'ahooks'

function useAccount() {
  const [account, setAccount] = useLocalStorageState<any>(
    '@packages/shared:useAccount-account'
  )

  return {
    account,
    setAccount,
  }
}

export default createModel(useAccount)
