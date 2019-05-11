import React, {useState} from 'react';

import Modal from "./Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faWindowClose} from "@fortawesome/free-solid-svg-icons";

interface PropTypes {
  visible: boolean;
  onClose: () => void;
  onSave: (activityName: string) => void;
}

const AddActivityModal: React.FC<PropTypes> = ({onClose, onSave, visible}: PropTypes) => {
  const [activityName, setActivityName] = useState('');

  const save = () => {
    onClose();
    onSave(activityName);
  };

  return (
    <Modal visible={visible}>
      <div className="add-activity-form">
        <label>Activity name</label>
        <input type="text" onChange={(event) => setActivityName(event.target.value)}/>
        <button onClick={() => save()}><FontAwesomeIcon icon={faSave}/> <span>Save</span></button>
        <button onClick={() => onClose()}><FontAwesomeIcon icon={faWindowClose}/> <span>Cancel</span></button>
      </div>
    </Modal>
  )
};

export default AddActivityModal;
