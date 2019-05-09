import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import AddActivityModal from "../activities/AddActivityModal";
import {addActivity, listActivities} from "../activities";
import {UserInfo} from "firebase";


interface PropTypes {
  user: UserInfo | null;
}

const Content: React.FC<PropTypes> = ({user}: PropTypes) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => listActivities(activities => console.log(activities)), [user]);

  const saveActivity = (activityName: string) => {
    addActivity(activityName);
  };

  return (
    <div>
      <AddActivityModal onSave={saveActivity} onClose={() => setModalVisible(false)} visible={modalVisible}/>
      <button onClick={() => setModalVisible(true)}>
        <FontAwesomeIcon icon={faPlus}/> <span>New activity</span>
      </button>
    </div>
  )
};

export default Content;
