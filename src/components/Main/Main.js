import React, { PureComponent } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import RequestField from '../RequestField/RequestField';
import LangChanger from '../LangChanger/LangChanger';
import Results from '../Results/Results';

import { apiKey, host } from "../../config/config.json"
import dataRu from '../../data/Main/data_ru.json';
import dataEn from '../../data/Main/data_en.json';

class Main extends PureComponent {
    constructor(props){
        super(props);
        
        this.state = {
            currentLanguage: localStorage.getItem("lang"),
            currentType: "",
            requestHost: "",
            loadStatus: "NONE",
            responseData: {},
            inputError: false,
            selectError: false,
        }
    }

    changeLanguage = (e) => {
        localStorage.setItem("lang", e.target.value);
        this.setState({
            currentLanguage: e.target.value
        });
    }

    changeRequestHost = (e) => {
        this.setState({
            requestHost: e.target.value,
            inputError: false
        })
    }

    changeRequestType = (e) => {
        this.setState({
            currentType: e.value,
            selectError: false
        })
    }

    enterClick = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            e.stopPropagation();
            this.sendRequest();
        }
    }

    dataCheck = () => {
        let { currentType, requestHost } = this.state;
       
        if(!requestHost || requestHost.length <= 0) {
            if(!currentType || currentType.length <= 0) {
                this.setState({
                    inputError: true,
                    selectError: true,
                })
                return false;
            }
            this.setState({
                inputError: true,
            })
            return false;
        }
        if(!currentType || currentType.length <= 0) {
            this.setState({
                selectError: true,
            })
            return false;
        }
        this.setState({
            inputError: false,
            selectError: false,
        })
        return true;
    }

    sendRequest = () => {
        let { currentType, requestHost } = this.state;

        this.setState({
            loadStatus: "LOADING",
        });

        if(this.dataCheck()){
            const addr = host + currentType
            axios.get(addr, {
                params: {
                    key: apiKey,
                    url: requestHost
                }
            }).then((response) => {
                if(response.data.result.code === 200){
                    this.setState({
                        responseData: response.data.results,
                        loadStatus: "SUCCESS"
                    })   
                } else {
                    this.setState({
                        responseData: response.data.result,
                        loadStatus: "SUCCESS_ERROR"
                    })  
                }
            }).catch((error) => {
                this.setState({
                    loadStatus: "NONE"
                })
            })
        }
    }

    render() {
        let { 
            currentLanguage, 
            requestHost, 
            currentType, 
            loadStatus, 
            responseData,
            inputError,
            selectError 
        } = this.state;
        let data;
        if(currentLanguage === "EN") {
            data = dataEn;
        } else {
            data = dataRu;
        }

        return (
            <Container onKeyDown={this.enterClick}>
                <Title>
                    <TitleText>{data.title}</TitleText>
                </Title>

                <Description>
                    <DescriptionText>{data.description}</DescriptionText>
                </Description>

                <RequestField 
                    currentLanguage={currentLanguage} 
                    value={requestHost} 
                    reqType={currentType} 
                    handlerChange={this.changeRequestHost} 
                    handlerType={this.changeRequestType}
                    inputError={inputError}
                    selectError={selectError}
                />

                <SendRequest onClick={this.sendRequest}>{data.button}</SendRequest>

                <LangChanger changeLanguage={this.changeLanguage} currentLanguage={currentLanguage}/>

                <Results currentLanguage={currentLanguage} loadStatus={loadStatus} responseData={responseData} />
            </Container>
        )
    }
}

export default Main;

const ContainerPadding = "10%";
const ContainerWidth = `calc(100% - 2 * ${ContainerPadding})`;

const Container = styled.div`
    width: ${ContainerWidth};
    min-height: 100vh;

    display: flex;
    flex-direction: column;

    position: relative;

    padding-left: ${ContainerPadding};
    padding-right: ${ContainerPadding};

    @media (max-width: 768px){
        padding-left: 0;
        padding-right: 0;
    }
`;

const Title = styled.div`
    width: 100%;

    margin-top: 10px;

    text-align: center;
`;

const TitleText = styled.h1`
    font-size: 40px;
    font-weight: normal;
    font-style: normal;
    line-height: 150%;
`;

const Description = styled.div`
    width: 100%;

    margin-top: 10px;

    text-align: center;
`;

const DescriptionText = styled.p`
    font-size: 23px;
    font-weight: normal;
    font-style: normal;
    line-height: 100%;

    margin-left: ${ContainerPadding};
    margin-right: ${ContainerPadding};
    margin-top: 10px;
    margin-bottom: 10px;

    @media (max-width: 768px){
        margin-left: 0;
        margin-right: 0;
    }
`;

const SendRequest = styled.button`
    width:20%;
    margin-left: 40%;
    margin-right: 40%;
    margin-top: 20px;
`;