import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SeatsPage({setPostou, setResultado}) {

    let [assentos,setAssentos] = useState(undefined);
    let [nome,setNome] = useState('');
    let [cpf,setCpf] = useState('');
    let [assentosEscolhidos,setAssentosEscolhidos] = useState([]);
    let [idsAssentosEscolhidos,setIdsAssentosEscolhidos] = useState([]);
    const parametro = useParams();
   
    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametro.idSessao}/seats`);
        promise.then((resposta)=>setAssentos(resposta.data));
        promise.catch((erro)=>alert('Algo de errado aconteceu!'));
    },
    []);

    if (assentos){
        return (
            <PageContainer>
                Selecione o(s) assento(s)
                <SeatsContainer>
                    {assentos.seats.map(lugar=>{
                        return(<SeatItem data-test="seat" condicao={lugar.isAvailable} key={lugar.id} onClick={()=>{
                            if (lugar.isAvailable==true){
                                setAssentosEscolhidos([...assentosEscolhidos,lugar.name]);
                                setIdsAssentosEscolhidos([...idsAssentosEscolhidos,lugar.id]);
                                lugar.isAvailable = 'choose';
                            } else if (lugar.isAvailable=='choose'){
                                lugar.isAvailable = true;
                                setAssentosEscolhidos(assentosEscolhidos.filter(
                                    elemento => {return elemento!=lugar.name}
                                ));
                                setIdsAssentosEscolhidos(idsAssentosEscolhidos.filter(
                                    elemento => {return elemento!=lugar.id}
                                ));
                            } else{
                                alert('Esse assento não está disponível');
                            }
                        }}>{lugar.name}</SeatItem>)
                    })}
                </SeatsContainer>
                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircle condicao={'choose'}/>
                        Selecionado
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle condicao={true}/>
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle condicao={false}/>
                        Indisponível
                    </CaptionItem>
                </CaptionContainer>
                <FormContainer>
                    Nome do Comprador:
                    <input data-test="client-name" placeholder="Digite seu nome..." value={nome} onChange={(e) => setNome(e.target.value)}/>
                    CPF do Comprador:
                    <input data-test="client-cpf" placeholder="Digite seu CPF..." value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                    <Link data-test="book-seat-btn" to='/sucesso' onClick={() => {
                                const reserva = {ids: idsAssentosEscolhidos, name: nome, cpf: cpf};
                                const promisePost = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many',reserva);
                                promisePost.then((element)=>{
                                    setPostou(true);
                                    setResultado({filme: assentos.movie.title,horario: assentos.name,  dia: assentos.day.date, lugares: assentosEscolhidos, name: nome, cpf: cpf}); 
                                });
                                promisePost.catch((erro)=>alert('Algo de errado aconteceu!'));
                        }}>
                        <button>Reservar Assento(s)</button>
                    </Link>
                </FormContainer>
                <FooterContainer data-test="footer">
                    <div>
                        <img src={assentos.movie.posterURL} alt="poster" />
                    </div>
                    <div>
                        <p>{assentos.movie.title}</p>
                        <p>{assentos.day.weekday} - {assentos.name}</p>
                    </div>
                </FooterContainer>
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
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0.04em;
`

const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    font-family: 'Roboto';
    font-weight: 400;
    line-height: 21px;
    color: #293845;
    button {
        align-self: center;
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
        margin-top: 57px;
        cursor: pointer;
    }
    input {
        box-sizing: border-box;
        width: calc(100vw - 60px);
        width: 327px;
        height: 51px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        padding-left:18px;
        margin-top: 1px;
        ::placeholder{
            color: #AFAFAF;
            font-style: italic;
        }
    }
    input:nth-child(1){
        margin-bottom: 7px;
    }
`

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`

const CaptionCircle = styled.div`
    border: 1px solid ${(props) => {
        if (props.condicao==true){
            return '#7B8B99';
        } else if (props.condicao=='choose'){
            return '#0E7D71'
        } else{
            return '#F7C52B ';
        }
    }};         // Essa cor deve mudar
    background-color: ${(props) => {
        if (props.condicao==true){
            return '#C3CFD9';
        } else if (props.condicao=='choose'){
            return '#1AAE9E'
        } else{
            return '#FBE192';
        }
    }};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`

const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const SeatItem = styled.div`
    border: 1px solid ${(props) => {
        if (props.condicao=='choose'){
            return '#0E7D71';
        } else if (props.condicao==true){
            return '#7B8B99';
        } else{
            return '#F7C52B ';
        }
    }};        // Essa cor deve mudar
    background-color: ${(props) => {
        if (props.condicao=='choose'){
            return '#1AAE9E';
        } else if (props.condicao==true){
            return '#C3CFD9';
        } else{
            return '#FBE192';
        }
    }};   // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    cursor: ${(props) => (props.condicao==false) ? 'not-allowed' : 'pointer'};
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
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`