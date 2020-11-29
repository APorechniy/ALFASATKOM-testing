import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import dataRu from '../../data/RequestField/data_ru.json';
import dataEn from '../../data/RequestField/data_en.json';

class RequestField extends PureComponent {
    setError = () => {
        let {
            inputError,
            selectError
        } = this.props;
        
        if(inputError) {
            let inp = document.getElementById("req_input");
            let lbl = document.getElementById("req_input--err");

            inp.style["borderColor"] = "red";
            lbl.style["display"] = "block";
        } else {
            let inp = document.getElementById("req_input");
            let lbl = document.getElementById("req_input--err");

            inp.style["borderColor"] = "hsl(0,0%,80%)";
            lbl.style["display"] = "none";
        }

        if(selectError) {
            let sel = document.getElementById("req_select");
            let lbl = document.getElementById("req_select--err");
            
            sel.style["border"] = "1px solid red";
            lbl.style["display"] = "block";
        } else {
            let sel = document.getElementById("req_select");
            let lbl = document.getElementById("req_select--err");
            
            sel.style["border"] = "hsl(0,0%,80%) 1px solid";
            lbl.style["display"] = "none";
        }
    }

    formatGroupLabel = data => (
        <div style={SELECT_STYLES}>
          <span>{data.label}</span>
          <span style={SPAN_STYLES}>{data.options.length}</span>
        </div>
    );

    componentDidUpdate = () => {
        this.setError();
    }

    componentDidMount = () => {
        let sel = document.getElementById("req_select");
            
        sel.firstChild.style["border"] = "none";
        sel.style["border"] = "hsl(0,0%,80%) 1px solid";
        sel.style["borderRadius"] = "4px";
    }

    render() {
        let { 
            currentLanguage, 
            value, 
            reqType, 
            handlerChange, 
            handlerType,
        } = this.props;

        let data;
        if(currentLanguage === "EN") {
            data = dataEn;
        } else {
            data = dataRu;
        }

        const SELECT_OPTIONS = [
            { value: 'Host', label: `${data.firstOption}` },
            { value: 'Tech', label: `${data.secondOption}`  },
        ];

        return (
            <Container>
                <HostName id="req_input" placeholder={data.inputPlaceholder} value={value} onChange={(e) => handlerChange(e)} />
                <ErrMsgInput id="req_input--err" for="req_input">{data.firstErr}</ErrMsgInput>
                <SearchOptions>
                    <Select 
                        id="req_select"
                        options={SELECT_OPTIONS}
                        formatGroupLabel={this.formatGroupLabel}
                        styles={{ width: "25%" }}
                        onChange={handlerType}
                        defaultValue={reqType}
                        placeholder={`${data.typePlaceholder}`}
                    />
                </SearchOptions>
                <ErrMsgSelect id="req_select--err" for="req_select">{data.secondErr}</ErrMsgSelect>
            </Container>
        )
    }
}

export default RequestField;

const SELECT_STYLES = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const SPAN_STYLES = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const Container = styled.div`
    width: 80%;
    height: 60px;

    margin-top: 15px;

    margin-left: 10%;
    margin-right: 10%;

    display: flex;
    flex-direction: row;

    position: relative;
`;

const HostName = styled.input`
    width: 75%;    
    
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: hsl(0,0%,100%);
    border-color: hsl(0,0%,80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    cursor: default;    

    padding-left: 5px;
    
    height: 40px;
    outline: 0 !important;
    position: relative;
    
    box-sizing: border-box;    
`;

const SearchOptions = styled.div`
    flex-basis: 25%;
`;

const ErrMsgInput = styled.label`
    position: absolute;
    bottom: 0;
    left: 10px;

    line-height: 15px;
    font-size: 15px;
    color: red;

    display: none;
`;

const ErrMsgSelect = styled.label`
    position: absolute;
    bottom: 0;
    left: calc(75% + 10px);

    line-height: 15px;
    font-size: 15px;
    color: red;

    display: none;
`;
