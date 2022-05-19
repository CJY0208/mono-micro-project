import { createModel } from 'hox'
import { useLocalStorageState } from 'ahooks'

function useAppConfig() {
  const [locale, setLocale] = useLocalStorageState(
    '@packages/shared:useAppConfig-locale',
    {
      defaultValue: 'zh-CN',
    }
  )

  return {
    locale,
    setLocale,
  }
}

export default createModel(useAppConfig)
