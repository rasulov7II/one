import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from '../layout';
import SignCom from '../Auth';
import InboxCom from '../navbar/InboxCom';
import UsersCom from '../navbar/Users';

 import ProductsCom from "../navbar/ProductsCom"
import KanbanCom from '../navbar/KanbanCom';
function App() {

  return (
    <div className="App">

      <BrowserRouter>

        <Routes>
          <Route path='/' element={<SignCom />} />
        </Routes>
        <Routes>
          <Route  element={<Layout />}>
            <Route path='/Dashbord' element={<h1>Dashbord</h1>} />
            <Route path='/kanban' element={<KanbanCom />} />
            <Route path='/Inbox' element={<InboxCom />} />
            <Route path='/Users' element={<UsersCom />} />
            <Route path='/Products' element={<ProductsCom />} />

          </Route>
        <Route path='/admin/dashboard' element={<h1>Hello</h1>} />
        {/* <Route path='/*' element={<NotFound />} /> */}
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
