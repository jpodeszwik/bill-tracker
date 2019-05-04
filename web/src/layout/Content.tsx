import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import AddActivityModal from "../activities/AddActivityModal";

const Content: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const saveActivity = (activityName: string) => {
    console.log(activityName);
    setModalVisible(false);
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
