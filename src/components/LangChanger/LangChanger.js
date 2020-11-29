import React, { PureComponent } from 'react';
import styled from 'styled-components';

import dataRu from '../../data/LangChanger/data_ru.json';
import dataEn from '../../data/LangChanger/data_en.json';

import russia from '../../assets/images/russia.svg'
import england from '../../assets/images/england.svg'
import arrow from '../../assets/images/lang_arrow.svg'

class LangChanger extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        }
    }

    handleBlock = (e) => {
        if(this.state.isOpen) {
            let wrapper = document.getElementById("modal_container");
            let wrapper_arrow = document.getElementById("modal_arrow");

            wrapper.style["top"] = "-105px";
            wrapper_arrow.style["transform"] = "none";

            this.setState({
                isOpen: false
            })
        } else {
            let wrapper = document.getElementById("modal_container");
            let wrapper_arrow = document.getElementById("modal_arrow");

            wrapper.style["top"] = "0";
            wrapper_arrow.style["transform"] = "rotate(180deg)";

            this.setState({
                isOpen: true
            })
        }
    }

    render() {
        let { changeLanguage, currentLanguage } = this.props;
        let data;
      
        if(currentLanguage === "EN") {
            data = dataEn;
        } else {
            data = dataRu;
        }

        return (
            <Container id="modal_container">
                <form onChange={(e) => changeLanguage(e)}>
                    {data.title}
                    <p>
                        <input name="lang" type="radio" value="RU" checked={currentLanguage === "RU"}></input>
                        <CountryIcon width="20" height="20" src={russia}></CountryIcon>
                    </p>
                    <p>
                        <input name="lang" type="radio" value="EN" checked={currentLanguage === "EN"}></input>
                        <CountryIcon width="20" height="20" src={england}></CountryIcon>
                    </p>
                    <Arrow id="modal_arrow" onClick={this.handleBlock}/>
                </form>
            </Container>
        )
    }
}

export default LangChanger;

const Container = styled.div`
    width: 200px;
    height: 130px;

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-bottom-right-radius: 100px;

    background: #ffc738;

    transition-property: top;
    transition-duration: .3s;
    transition-timing-function: ease; 
`;

const Arrow = styled.div`
    content: url(${arrow});
    width: 25px;
    height: 25px;

    position: absolute;
    bottom: 0;
    right: 0;

    transform: rotate(180deg);

    transition-property: transform;
    transition-duration: .3s;
    transition-timing-function: ease; 

    cursor: pointer;
`;

const CountryIcon = styled.img`
    margin-left: 20px;
`;