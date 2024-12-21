import { Helmet } from 'react-helmet-async'

import { Button } from './components/ui/button'

function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Helmet title="Home" />
      <Button>Hello World</Button>
    </div>
  )
}

export default App
