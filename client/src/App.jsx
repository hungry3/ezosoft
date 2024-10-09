import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Navbar from './components/Navbar'
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Pricing from "./Pages/Pricing/Pricing";
import Software from "./Pages/Software/Software";
import TemplatePage from "./Pages/TemplateCategories/Template";
import BlogInner from "./Pages/Blog-inner-page/BlogInner.jsx";
import Knowledge from "./Pages/Knowledge1/Knowledge";
import Knowledge2 from "./Pages/Knowledge2/Knowledge";
import Knowledge3 from "./Pages/Knowledge3/Knowledge3";
import LogIn from "./Pages/Log_in/LogIn";
import SignUpPage from "./Pages/SignIp/SignUpPage";
import ContactSale from "./Pages/ContactSales/ContactSale";
import ContactSupport from "./Pages/ContactSupport/ContactSupport";
import Documents from "./Pages/Documents/Documents";
import Document1 from "./Pages/Document1/Document1";
// import Template from '/src/Pages/Template/Template'
import Presentation from "./Pages/Presentation/Presentation";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AuthProvider } from "./utils/authContext";
import ForgotPass from "./Pages/ForgotPassword/ForgotPass";
import ResetPass from "./Pages/ResetPassword/ResetPass";
import Blog from "./Pages/Main-Blog-Page/Blog";

import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import FileViewer from "./components/FileView/FileView.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CategoryPage from "./Pages/Main-Blog-Page/category/BlogCategory.jsx";
import Terms from "./Pages/Terms-and-Conditions/Terms.jsx";
import SingleTemplate from "./Pages/singletemplate/SingleTemplate.jsx";
import ScrollToTop from "./utils/Scroll.jsx";


const queryClient = new QueryClient();
function App() {


  return (
    <>
      <GoogleOAuthProvider
        clientId={
          "648324932049-2hob5s87vqnl0iu4svq9ao4r1b8g9pav.apps.googleusercontent.com"
        }
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter>
              {/* <Navbar /> */}
              <ScrollToTop/>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/pricing"
                    element={
                     
                        <Pricing />
                    
                    }
                  />
                  <Route path="/software" element={<Software />} />
                  <Route path="/enterprise" element={<Blog />} />
                  {/* <Route path="/template" element={<InnerTemplate/>} /> */}
                  <Route path="/resources" element={<TemplatePage />} />
                  <Route path="/knowledge" element={<Knowledge/>} />
                  <Route path="/blog/:id" element={<BlogInner />} />
                  <Route
                    path="/blog/category/:category"
                    element={<CategoryPage />}
                  />
                  <Route path="/knowledge2" element={<Knowledge2 />} />
                  <Route path="/knowledge3" element={<Knowledge3 />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/contact" element={<ContactSale />} />
                  <Route path="/privacy" element={<Terms />} />
                  <Route path="/contactSupport" element={<ContactSupport />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/document1" element={<Document1 />} />
                 

                  {/* <Route path="/template" element={<Template/>} /> */}
                  <Route path="/presentation" element={<Presentation />} />
                  <Route path="/forgot" element={<ForgotPass />} />
                  <Route
                    path="/api/auth/reset-password/:token"
                    element={<ResetPass />}
                  />
                  <Route path="/fileview" element={<FileViewer />} />
                  <Route path="/dashboard" element={<Dashboard />} />

                  <Route path="/templates/:id" element={<SingleTemplate />} />
                </Routes>
              </ErrorBoundary>
            </BrowserRouter>
          </AuthProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
