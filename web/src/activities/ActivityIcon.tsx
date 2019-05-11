import React from "react";
import {Status} from "./activities";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faExclamationTriangle, faQuestion, faTimes} from "@fortawesome/free-solid-svg-icons";

interface PropTypes {
  status: Status,
  onClick: () => any,
}


const getIcon = (status: Status) => {
  switch (status) {
    case "TO_DO":
      return faTimes;
    case "DONE":
      return faCheck;
    case "WARNING":
      return faExclamationTriangle;
    default:
      return faQuestion;
  }
};

const getColor = (status: Status) => {
  switch (status) {
    case "TO_DO":
      return 'darkred';
    case "DONE":
      return 'darkgreen';
    case "WARNING":
      return 'darkgoldenrod';
    default:
      return 'black';
  }
};

const ActivityIcon: React.FC<PropTypes> = ({status, onClick}: PropTypes) => (
  <div title={status as string} onClick={onClick}><FontAwesomeIcon size={"2x"} color={getColor(status)} icon={getIcon(status)}/></div>
);

export default ActivityIcon;
