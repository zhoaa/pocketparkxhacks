import React, {useState, useEffect} from 'react';

import chestClose from "../images/park/chest-close-lum.png";
import chestOpen from "../images/park/chest-open-lum.png"
import inventoryText from "../images/park/INVENTORY.png";

import shopClose from "../images/park/shop-close.png";
import shopOpen from "../images/park/shop-open.png";
import shopText from "../images/park/STORE.png";

import parkTrees from '../images/park/base-large.gif';
import mainTree from "../images/park/maintree.gif";
import bench from "../images/park/cloudbench.png";
import bar from "../images/park/mehbar.png"
import bush from "../images/park/bush.png"

import { useParams } from 'react-router';
import {useHistory} from 'react-router-dom';

import {getPark} from '../api/index';

export default function Park() {
    const {id} = useParams();
    const [name, setName] = useState("...");
    const [messLevel, setMessLevel] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const history = useHistory();

    const padDigits = (number) => {
        return ("00" + number).slice(-2);
    }

    // Change a time in seconds to a string (00:00:00)
    const timeToStr = (timeLeft) => {
        const seconds = timeLeft % 60;
        const minutes = Math.floor(timeLeft / 60) % 60; // JS can't be forced to do integer division
        const hours = Math.floor(minutes / 60) % 24; // limit for timer is one day
        const timeStr = padDigits(hours) + ":" + padDigits(minutes) + ":" + padDigits(seconds);
        return timeStr;
    }

     useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);


    useEffect(() => {
        getPark(id).then((data) => {
            setName(data.data.name);
            setMessLevel(data.data.messLevel);
        });
    });

    return (
        <>
            <header className="parkHeader">
                {name}
            </header>
            <div className="container">
                <div className="slidingCloudBackgound"></div>
            </div>
            <img className="parkTrees" src={parkTrees}/>
            <img className="tree" src={mainTree}/>
            <img className="bench" src={bench}/>
            <img className="bush" src={bush}/>
            <div className="parkBottomBar">
                <div className="parkCard" onClick={() => history.push('/inventory')}>
                    <img className="inv imgBot" src={chestClose}/>
                    <img className="inv imgTop" src={chestOpen}/>
                    <header className="parkBottomHeader">Inventory</header>
                </div>
                <div className="parkCard">
                    <img className="bar" src={bar}/>
                    <header id="clock" className="parkBottomHeader">
                    {timeToStr(seconds)}
                    </header>
                </div>
                <div className="parkCard" onClick={() => history.push('/shop')}>
                    <img className="store imgBot" src={shopClose} />
                    <img className="store imgTop" src={shopOpen}/>
                    <header className="parkBottomHeader">Store</header>
                </div>
            </div>
        </>
    );
}
