import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import styled from "styled-components";
import axios from "axios";

export default function SuccessPage() {

    let [postou, setPostou] = useState(undefined);
    const parametro = useParams();

    useEffect(()=>{
        const reserva = {ids: parametro.ids.split(','), name: parametro.name, cpf: parametro.cpf};
        const promisePost = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many',reserva);
        promisePost.then((element)=>setPostou(element.data));
        promisePost.catch((erro)=>alert('Algo de errado aconteceu!'));
    },
    []);

    if (postou){
        return (
            <PageContainer>
                <h1>Pedido feito <br /> com sucesso!</h1>
                <TextContainer>
                    <strong>Filme e sessão</strong>
                    <p>{parametro.filme}</p>
                    <p>{parametro.dia.replace(/,/g,'/')} - {parametro.horario}</p>
                </TextContainer>
                <TextContainer>
                    <strong>Ingressos</strong>
                    {parametro.lugares.split(',').map(lugar => <p key={lugar}>Assento {String(lugar).padStart(2, '0')}</p>)}
                </TextContainer>
                <TextContainer>
                    <strong>Comprador</strong>
                    <p>Nome: {parametro.name}</p>
                    <p>CPF: {parametro.cpf}</p>
                </TextContainer>
                <Link to='/'><button>Voltar para Home</button></Link>
            </PageContainer>
        )
    }else{
        return(
            <PageContainer>
                Carregando...
            </PageContainer>
        )
    }
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;  
        width: 225px;
        height: 42px;
        background: #E8833A;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        letter-spacing: 0.04em;
        color: #FFFFFF;
        cursor: pointer;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
        letter-spacing: 0.04em;
    }
`

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    p{
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 22px;
        line-height: 26px;
        letter-spacing: 0.04em;
        color: #293845;
    }
    strong {
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
    }
`