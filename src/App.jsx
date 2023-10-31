import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Header from "./componant/Header"
import Footer from "./componant/footer"
import ViewDetail from "./pages/viewDetail"
import Try from "./pages/tryModel"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/viewDetail" element={<ViewDetail />}></Route>
          <Route path="/try" element={<Try />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
