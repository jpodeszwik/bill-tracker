import React, {useEffect, useState} from 'react';
import {Activity, addActivity, listActivities} from "./activities";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddActivityModal from "./AddActivityModal";
import {UserInfo} from "firebase";
import ActivitiesGrid from "./ActivitiesGrid";
import "./Activities.css";
import Swipe from "./Swipe";


interface PropTypes {
  user: UserInfo,
}

const Activities: React.FC<PropTypes> = ({user}: PropTypes) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitiesOffset, setActivitiesOffset] = useState(0);

  useEffect(() => listActivities(setActivities), [user]);

  const saveActivity = (activityName: string) => {
    addActivity(activityName);
  };

  return (
    <div className="activities-container">
      <Swipe onSwipeLeft={() => setActivitiesOffset(activitiesOffset - 1)}
             onSwipeRight={() => setActivitiesOffset(activitiesOffset + 1)}>
        <ActivitiesGrid activities={activities} offset={activitiesOffset}/>
      </Swipe>
      <button onClick={() => setModalVisible(true)}>
        <FontAwesomeIcon icon={faPlus}/> <span>New</span>
      </button>
      <AddActivityModal onSave={saveActivity} onClose={() => setModalVisible(false)} visible={modalVisible}/>
    </div>
  )
};

export default Activities;
