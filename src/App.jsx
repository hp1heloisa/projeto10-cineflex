import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import SetaVoltar from "./components/SetaVoltar"
import axios from "axios"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from "react"

export default function App() {
    
    axios.defaults.headers.common['Authorization'] = '4aM0zdek9vylJloFhgNLtldy';

    let [postou, setPostou] = useState(false);
    let [aparece, setAparece] = useState('');




    return (
        <BrowserRouter>
            <NavContainer aparece={aparece}>
                <SetaVoltar setAparece={setAparece}/>
                CINEFLEX
            </NavContainer>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/sessoes/:idFilme' element={<SessionsPage />} />
                <Route path='/assentos/:idSessao' element={<SeatsPage setPostou={setPostou} />} />
                <Route path='/sucesso/' element={<SuccessPage postou={postou}/>} />            
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
    ion-icon{
    color: #000000;
    position: absolute;
    left: 18px;
    top: 20px;
    display:${(props) => props.aparece};
    z-idex:10;
}
`
