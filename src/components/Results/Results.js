import React, { PureComponent } from 'react';
import styled from 'styled-components';

import dataRu from '../../data/Results/data_ru.json';
import dataEn from '../../data/Results/data_en.json';

class Results extends PureComponent {
    render() {
        let { loadStatus, responseData, currentLanguage } = this.props;

        let data;
        if(currentLanguage === "EN") {
            data = dataEn;
        } else {
            data = dataRu;
        }

        let renderData = [];

        if(loadStatus === "SUCCESS"){
            for(let item in responseData[0]){
                renderData.push((
                    <ItemRow key={item}>
                        <Name>{item}</Name>
                        <Value>{responseData[0][item]}</Value>
                    </ItemRow>
                ));
            }
        }

        if(loadStatus === "SUCCESS_ERROR"){
            if(responseData.code === 120){
                renderData = (
                    <ItemRow key={responseData.code}>
                        {data.limit_code}
                    </ItemRow>
                );
            }  
            if(responseData.code === 201){
                renderData = (
                    <ItemRow key={responseData.code}>
                        {data.not_found_code}
                    </ItemRow>
                );
            }      
            if(responseData.code === 111){
                renderData = (
                    <ItemRow key={responseData.code}>
                        {data.invalid_url_code}
                    </ItemRow>
                );
            }            
        }

        return (
            <Container>
                {renderData}
            </Container>
        )
    }
}

export default Results;

const Container = styled.div`
    width: 80%;
    min-height: 200px;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const ItemRow = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: center;

    border-bottom: 1px rgba(0, 0, 0, 0.15) solid;

    &:first-child {
        border-top: 1px rgba(0, 0, 0, 0.15) solid;
    }
`;

const Name = styled.div`
    flex-basis: 50%;
    height: 50px;

    display: flex;
    align-items: center;

    padding-left: 5%;

    border-left: 1px rgba(0, 0, 0, 0.15) solid;
`;

const Value = styled.div`
    flex-basis: 50%;
    height: 50px;

    display: flex;
    align-items: center;

    padding-left: 5%;

    word-wrap: normal;
    white-space: nowrap;

    border-left: 1px rgba(0, 0, 0, 0.15) solid;
    border-right: 1px rgba(0, 0, 0, 0.15) solid;
`;
