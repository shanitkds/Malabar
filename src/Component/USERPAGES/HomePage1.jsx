import React, { useState } from 'react'
import NaveBar from '../User/NaveBar'
import HomePage from '../User/HomePage'
import Footer from '../Footer';
import About from '../User/About';
function HomePage1() {
const [todo, setTodo] = useState(false);

  return (
    <div>
        <NaveBar/>
        <HomePage/>
        <About/>
        {/* <Footer/> */}
    </div>
  )
}

export default HomePage1