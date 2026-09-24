import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Layout} from "./Layout.tsx";
import {LandingPage} from "./pages/LandingPage.tsx";
import {ForYouPage} from "./pages/ForYouPage.tsx";
import {DiscoveryPage} from "./pages/DiscoveryPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {ReadListPage} from "./pages/ReadListPage.tsx";
import {NotFoundPage} from "./pages/NotFoundPage.tsx";
import {PrivateRoutes} from "./services/PrivateRoutes.tsx"
import {LeesprofielQuestionPage} from "./pages/LeesprofielQuestionPage.tsx";

function App() {
  return (
      <Router>
          <Routes>
              <Route element={<Layout />} >
                  <Route path="/" element={<LandingPage/>}/>
                  <Route path={"*"} element={<NotFoundPage/>}/>

                  <Route element={<PrivateRoutes />}>
                      <Route path="/VoorJou" element={<ForYouPage/>}/>
                      <Route path="/Ontdekken" element={<DiscoveryPage/>}/>
                      <Route path="/Profiel" element={<ProfilePage/>}/>
                      <Route path="/LeesLijst" element={<ReadListPage/>}/>
                      <Route path={"/LeesprofielQuestionPage"} element={<LeesprofielQuestionPage/>}/>
                  </Route>
              </Route>
          </Routes>
      </Router>
  )
}

export default App
