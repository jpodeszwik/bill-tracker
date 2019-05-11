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

const ActivityIcon: React.FC<PropTypes> = ({status, onClick}: PropTypes) => (
  <div title={status as string} className={`activity activity-${status}`} onClick={onClick}><FontAwesomeIcon icon={getIcon(status)}/></div>
);

export default ActivityIcon;
