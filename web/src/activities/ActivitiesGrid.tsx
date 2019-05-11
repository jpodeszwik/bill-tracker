import React from "react";
import {Activity, Status, toggleStatus} from "./activities";
import moment from 'moment';
import ActivityIcon from "./ActivityIcon";

interface PropTypes {
  activities: Activity[],
}

const ActivitiesGrid: React.FC<PropTypes> = ({activities}: PropTypes) => {
  const currentMonth = moment().format('YYYY-MM');
  const previousMonth = moment().subtract(1, 'months').format('YYYY-MM');
  const nextMonth = moment().add(1, 'months').format('YYYY-MM');

  return (
    <div className="activities-grid">
      <div>Activity</div>
      <div>{previousMonth}</div>
      <div>{currentMonth}</div>
      <div>{nextMonth}</div>
      {activities.flatMap(activity => {
        const statuses = activity.statuses || {};
        const prevMonthStatus: Status = statuses[previousMonth] || 'TO_DO';
        const currentMonthStatus = statuses[currentMonth] || 'TO_DO';
        const nextMonthStatus = statuses[nextMonth] || 'TO_DO';
        const activityId = activity.id as string;

        return [
          (<div key={activityId}>{activity.name}</div>),
          (<ActivityIcon status={prevMonthStatus}
                         onClick={() => toggleStatus(activityId, previousMonth)}
                         key={`${activityId}-prev`}/>),
          (<ActivityIcon status={currentMonthStatus}
                         onClick={() => toggleStatus(activityId, currentMonth)}
                         key={`${activityId}-current`}/>),
          (<ActivityIcon status={nextMonthStatus}
                         onClick={() => toggleStatus(activityId, nextMonth)}
                         key={`${activityId}-next`}/>),
        ]
      }
      )}
    </div>
  )
};

export default ActivitiesGrid;
