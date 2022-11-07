import './App.css';
import SideMenu from "./components/SideMenu";
import Plans from "./pages/plans";
import MAWB from "./pages/mawb";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';

const Dashboard = () => {
  return <h1>Dashboard</h1>;
};
const AboutUs = () => {
  return <h1>AboutUs</h1>;
};
const ContactUs = () => {
  return <h1>ContactUs</h1>;
};
const FAQ = () => {
  return <h1>FAQ</h1>;
};
const Posts = () => {
  return <h1>Posts</h1>;
};
const ListPosts = () => {
  return <h1>List Posts</h1>;
};
const CreatePosts = () => {
  return <h1>Create Posts</h1>;
};
const MyAccount = () => {
  return <h1>My Account</h1>;
};
const MyWorkspace = () => {
  return <h1>My Workspace</h1>;
};
const MyProfile = () => {
  return <h1>My Profile</h1>;
};
const Error = () => {
  return <h1>Error</h1>;
};


function App() {

  const [inactive, setInactive] = useState(false);
  const [inactivePlans, setInactivePlans] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <SideMenu onCollapse={(inactive) => {
          setInactive(inactive);
        }}/>

        <toolbar>
        <div className={`container ${inactive ? "inactive" : ""}`}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/AboutUs' element={<AboutUs />} />
            <Route path='/ContactUs' element={<ContactUs />} />
            <Route path='/FAQ' element={<FAQ />} />
            <Route path='/Posts' element={<Posts />} />
            <Route path='/Posts/ListPosts' element={<ListPosts />} />
            <Route path='/Posts/CreatePosts' element={<CreatePosts />} />
            <Route path='/MyAccount' element={<MyAccount />} />
            <Route path='/MyAccount/MyWorkspace' element={<MyWorkspace />} />
            <Route path='/MyAccount/MyProfile' element={<MyProfile />} />
            <Route path='/plans' element={ <Plans onCollapse={(inactivePlans) => {setInactivePlans(inactivePlans);}}/> } >
              <Route path='/plans/:mawb' element={<MAWB />} />
            </Route>
            <Route path='/*' element={<Error />} />
          </Routes>
        </div>
        </toolbar>

        

        

        {/*<Routes>
           <Route path={'/'}>
            <Dashboard />
          </Route>
          <Route path={'/content'}>
            <Dashboard />
          </Route>
          <Route path={'/content/courses'}>
            <Dashboard />
          </Route>
          <Route path={'/content/videos'}>
            <Dashboard />
          </Route>
          <Route path={'/design'}>
            <Dashboard />
          </Route> 
        </Routes>*/}

      </BrowserRouter>
      
    </div>
  );
}

export default App;
