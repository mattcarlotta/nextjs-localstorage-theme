import { useCallback, useEffect, useState } from 'react'

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [value: T, updateValue: (value: T) => void] {
  const [value, setValue] = useState(initialValue)

  const updateValue = useCallback(
    (value: T): void => {
      localStorage.setItem(key, JSON.stringify(value))
      setValue(value)
    },
    [key]
  )

  useEffect(() => {
    const value = localStorage.getItem(key)
    updateValue(value ? JSON.parse(value) : initialValue)
  }, [key, initialValue, updateValue])

  return [value, updateValue]
}
