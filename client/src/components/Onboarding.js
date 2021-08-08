import React from 'react';
import {
  Link
} from "react-router-dom";

export const Onboarding1 = () => {
  return (
      <div className="background">
          <div className="onboardingTextbox">
            <div className="onboardingText">
              WELCOME &nbsp; TO POCKET PARK! SELECT A &nbsp; LOCAL PARK,&nbsp;  AND&nbsp;  HELP CLEAN &nbsp;
              UP &nbsp; LITTER AND&nbsp;  GARBAGE IN  &nbsp;  ORDER &nbsp; TO &nbsp; EARN PARK POINTS! THE
              LONGER &nbsp; YOU &nbsp; STAY, &nbsp; THE &nbsp;   MORE &nbsp; POINTS YOU &nbsp; EARN !
            </div>
            <div className="onboardingNext"><Link to="/onboarding2">NEXT > </Link></div>
          </div>
          <div className="onboardingChickadee"></div>
      </div>
  );
};

export const Onboarding2 = () => {
  return (
      <div className="background">
          <div className="onboardingTextbox">
            <div className="onboardingText">
              YOU &nbsp;  CAN  &nbsp; USE &nbsp; POINTS &nbsp; TO &nbsp; BUY &nbsp;  ITEMS &nbsp;  FOR &nbsp; YOUR VERY &nbsp;
              OWN &nbsp; VIRTUAL CAMP, &nbsp; LIKE &nbsp;  THIS &nbsp; FABULOUS  &nbsp;  BIRD &nbsp;  HOUSE!
            </div>
            <div className="onboardingBirdhouse"></div>
            <div className="onboardingNext"><Link to="/map">NEXT > </Link></div>
          </div>
          <div className="onboardingChickadee"></div>
      </div>
  );
}
