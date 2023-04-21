import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import Blockview from './block/Blockview';
import MessageApp from "./SignMessage/MessageApp";
import VerifyApp from "./SignMessage/VerifyApp";
import Post from './posts/Post';
import Add from './posts/Add';
import Edit from './posts/Edit';

import {
  useNavigate,
} from 'react-router-dom'

function App() {
  let navigate = useNavigate()
  return (

    <Container>
      <Menu secondary>
        <Menu.Item
          name='BlockChain Data'
          onClick={() => navigate('/')}
        />
        <Menu.Item
          name='Verify n Transact'
          onClick={() => navigate('/VerifyApp')}
        />
         <Menu.Item
          name='View Story'
          onClick={() => navigate('/post')}
        />
      </Menu>

      <Routes>
        <Route path='/' element={<Blockview />} />
        <Route path='/blockview' element={<Blockview />} />
        <Route path='/messageApp' element={<MessageApp />} />
        <Route path='/verifyApp' element={<VerifyApp />} />
        <Route path='/post' element= {<Post />} />
        <Route path='/create' element= {<Add />} />
        <Route path='/edit' element= {<Edit />} />
      </Routes>
    </Container>
  )
}

export default App
