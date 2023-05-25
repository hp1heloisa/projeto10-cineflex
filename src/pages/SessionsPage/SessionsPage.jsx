import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SessionsPage() {

    let [sessoes,setSessoes] = useState(undefined);
    const parametro = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${parametro.idFilme}/showtimes`);
        promise.then((resposta)=>setSessoes(resposta.data));
        promise.catch((erro)=>alert('Algo de errado aconteceu!'));
    },
    []);

    if (sessoes){
        return (
            <PageContainer>
                Selecione o horário
                <div>
                    {sessoes.days.map(dia=>{
                        return(
                            <SessionContainer key={dia.id}>
                                {dia.weekday} - {dia.date}
                                <ButtonsContainer>
                                    {dia.showtimes.map(horario=>{return(
                                        <Link to={`/assentos/${horario.id}`} key={horario.id}>
                                            <button>
                                                {horario.name}
                                            </button>
                                        </Link>
                                    )})}
                                </ButtonsContainer>
                            </SessionContainer>
                        )
                        })}
                    <FooterContainer>
                        <div>
                            <img src={sessoes.posterURL} alt="poster" />
                        </div>
                        <div>
                            <p>{sessoes.title}</p>
                        </div>
                    </FooterContainer> 
                </div>
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
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0.04em;
    div {
        margin-top: 20px;
    }
`

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.02em;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        width: 83px;
        height: 43px;
        background: #E8833A;
        border-radius: 3px;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        letter-spacing: 0.02em;
        color: #FFFFFF;
        border: none;
        cursor: pointer;
    }
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;
    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }
    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            font-family: 'Roboto';
            font-weight: 400;
            font-size: 26px;
            line-height: 30px;
            color: #293845;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`