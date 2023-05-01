import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function MySwitch({value, label='label', on=false, onChange=(e, value) => {} }) {
  const [enabled, setEnabled] = useState(on)

  const handleChange = (e) => {
    setEnabled(e);
    if (typeof onChange=== 'function'){
      onChange(e, value);
    }
  }

  return (
    <div className="py-16">
      <Switch
        checked={enabled}
        value={value}
        onChange={handleChange}
        className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  )
}