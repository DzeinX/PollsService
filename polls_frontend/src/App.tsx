import './App.css'
import TheHeader from "@/components/TheHeader/TheHeader.tsx";
import TheMain from "@/components/TheMain/TheMain.tsx";
import TheFooter from "@/components/TheFooter/TheFooter.tsx";
import {enableCache} from "@iconify/react";

function App() {
  enableCache('session');
  return (
    <div className="w-[100vh] m-auto">
      <TheHeader/>
      <TheMain/>
      <TheFooter/>
    </div>
  )
}

export default App
