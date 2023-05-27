import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function SetaVoltar({setAparece}) {
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        if (location.pathname=='/' || location.pathname=='/sucesso'){
            setAparece('none');
        } else{
            setAparece('');
        }
    })

    return(
        <ion-icon data-test="go-home-header-btn" name="arrow-back-outline" onClick={()=>{
            navigate(-1);
        }}></ion-icon>
    )
}

