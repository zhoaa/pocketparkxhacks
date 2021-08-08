import React from 'react';

import condo from "../images/goods/BIRDCONDO BUY.png";
import cardinal from "../images/goods/CARDINAL BUY.png";
import redberry from "../images/goods/REDBERRY BUY.png";
import dawn from "../images/goods/DAWN BUY.png";
import dreamcatcher from "../images/goods/DREAMCATCHER BUY.png";
import nuthatch from "../images/goods/NUTHATCH BUY.png";
import cherry from "../images/goods/CHERRYBENCH BUY.png";
import citynight from "../images/goods/CITYNIGHT BUY.png";
import shopspr from "../images/park/SHOPSPRITE.gif";

import {useHistory} from 'react-router-dom';

export const Shop = () => {
    const history = useHistory();
    return (
        <>
            <div className="shopContainer">
                <img className="shop" src={shopspr}/>
                <div className="itemOverlay">
                    <div className="items">
                        <img className="item" src={condo} />
                        <img className="item" src={cardinal} />
                        <img className="item" src={redberry} />
                        <img className="item" src={dawn} />
                        <img className="item" src={dreamcatcher} />
                        <img className="item" src={nuthatch} />
                        <img className="item" src={cherry} />
                        <img className="item" src={citynight} />
                    </div>
                </div>
            </div>
            <div className="shopBottomBar">
                <button className="shopBottomBarButton" onClick={() => history.goBack()}>Exit</button>
            </div>
        </>
    );
}
