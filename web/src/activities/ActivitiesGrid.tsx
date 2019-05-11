import React from "react";
import {Activity, TO_DO, toggleStatus} from "./activities";
import moment from 'moment';
import './ActivitiesGrid.css';

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
          const prevMonthStatus = statuses[previousMonth] || TO_DO;
          const currentMonthStatus = statuses[currentMonth] || TO_DO;
          const nextMonthStatus = statuses[nextMonth] || TO_DO;

          return [
            (<div key={activity.id}>{activity.name}</div>),
            (<div className={`activity-${prevMonthStatus}`}
                  onClick={() => toggleStatus(activity.id as string, previousMonth)}
                  key={`${activity.id}-prev`}>{prevMonthStatus}</div>),
            (<div className={`activity-${currentMonthStatus}`}
                  onClick={() => toggleStatus(activity.id as string, currentMonth)}
                  key={`${activity.id}-current`}>{currentMonthStatus}</div>),
            (<div className={`activity-${nextMonthStatus}`} onClick={() => toggleStatus(activity.id as string, nextMonth)}
                  key={`${activity.id}-next`}>{nextMonthStatus}</div>),
          ]
        }
      )}
    </div>
  )
};

export default ActivitiesGrid;
