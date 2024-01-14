import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

 

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~"

    console.log(str)

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

 const handleCopyPassword  = useCallback(()=>{
  passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div>
      <h1 className="text-4xl text-center text-white">Password Generator</h1>
      <div className="flex justify-center py-20">
        <input
          type="text"
          value={password}
          className="outline-none py-1 px-3 w-2/4 rounded-2xl"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={handleCopyPassword} className="bg-blue-500 text-white p-3 rounded-2xl ml-3">
          Copy
        </button>
      </div>
      <div className="flex justify-center">
        <div className="w-3/4 flex justify-center bg-gray-700 p-3 rounded-2xl gap-6">
          <div className="flex gap-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label className="text-orange-400">Length:{length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <span className="text-orange-400">Number</span>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <span className="text-orange-400">Special Character</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
