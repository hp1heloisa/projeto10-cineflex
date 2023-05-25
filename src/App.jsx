import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from "axios"
import { BrowserRouter, Routes, Route, Link, useParams} from "react-router-dom";
import { useNavigate} from "react-router"
import { useState } from "react"

export default function App() {
    
    axios.defaults.headers.common['Authorization'] = '4aM0zdek9vylJloFhgNLtldy';

    let [aparece, setAparece] = useState('none');
    const parametro = useParams();
    console.log(parametro);


    return (
        <BrowserRouter>
            <NavContainer visao={aparece}>
                <Link to={-1}><ion-icon data-test="go-home-header-btn" name="arrow-back-outline"></ion-icon></Link>
                CINEFLEX
            </NavContainer>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/sessoes/:idFilme' element={<SessionsPage setAparece={setAparece}/>} />
                <Route path='/assentos/:idSessao' element={<SeatsPage />} />
                <Route path='/sucesso/:ids/:lugares/:name/:cpf/:filme/:dia/:horario' element={<SuccessPage setAparece={setAparece} />} />            
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
    ion-icon {
        color: #000000;
        position: absolute;
        left: 18px;
        top: 20px;
        display: ${(props) => props.visao};
        z-idex:10;
    }
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
