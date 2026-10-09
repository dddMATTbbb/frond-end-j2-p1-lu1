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
import DocentPanelPage from "./pages/DocentPanelPage.tsx";
import {StudentRoutes} from "./services/StudentRoutes.tsx";
import {DocentRoutes} from "./services/DocentRoutes.tsx";
import ViewStudentPage from "./pages/ViewStudentPage.tsx";
import BoekPage from "./pages/BoekPage.tsx";

function App() {
  return (
      <Router>
          <Routes>
              <Route element={<Layout />} >
                  <Route path="/" element={<LandingPage/>}/>
                  <Route path={"*"} element={<NotFoundPage/>}/>
                  <Route path={"/boek/:boekId"} element={<BoekPage/>}/>
                  <Route element={<PrivateRoutes />}>
                      <Route element={<StudentRoutes />}>
                          <Route path="/VoorJou" element={<ForYouPage/>}/>
                          <Route path="/Ontdekken" element={<DiscoveryPage/>}/>
                          <Route path="/Profiel" element={<ProfilePage/>}/>
                          <Route path="/LeesLijst" element={<ReadListPage/>}/>
                          <Route path={"/LeesprofielQuestionPage"} element={<LeesprofielQuestionPage/>}/>
                      </Route>
                      <Route element={<DocentRoutes/>}>
                          <Route path="/DocentPanel" element={<DocentPanelPage />}/>
                          <Route path="/student/:id" element={<ViewStudentPage />}/>
                      </Route>
                  </Route>
              </Route>
          </Routes>
      </Router>
  )
}

export default App
