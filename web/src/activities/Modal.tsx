import React from 'react';

interface PropTypes {
  children: any,
  visible: boolean
}

const Modal: React.FC<PropTypes> = ({children, visible}: PropTypes) => {
  const height = visible ? '100%' : '0';
  const width = visible ? '100%' : '0';
  const visibility = visible ? 'visible' : 'hidden';

  return (
    <div className="modal" style={{width: width, height: height}}>
      <div className="modal-children" style={{visibility: visibility}}>
        {children}
      </div>
    </div>
  )
};

export default Modal;
