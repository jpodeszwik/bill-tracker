import React, {useEffect, useState} from 'react';
import {Activity, addActivity, listActivities} from "../activities";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddActivityModal from "./AddActivityModal";
import {UserInfo} from "firebase";


interface PropTypes {
  user: UserInfo | null,
}

const Activities: React.FC<PropTypes> = ({user}: PropTypes) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => listActivities(setActivities), [user]);

  const saveActivity = (activityName: string) => {
    addActivity(activityName);
  };

  return (
    <div>
      <ul>
        {activities.map(activity => (<li key={activity.id}>
          {activity.name}
        </li>))}
      </ul>
      <button onClick={() => setModalVisible(true)}>
        <FontAwesomeIcon icon={faPlus}/> <span>New activity</span>
      </button>
      <AddActivityModal onSave={saveActivity} onClose={() => setModalVisible(false)} visible={modalVisible}/>
    </div>
  )
};

export default Activities;
