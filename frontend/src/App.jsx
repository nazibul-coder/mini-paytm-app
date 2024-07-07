import { Route, Routes } from "react-router-dom"
import SignUp from "./components/SignUp"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import { UserContextProvider } from "./context/UserContext"
import SendMoney from "./components/SendMoney"

function App() {

  return (
    <div className="">
      <UserContextProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/sendmoney/:userId" element={<SendMoney />} />
        </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App
