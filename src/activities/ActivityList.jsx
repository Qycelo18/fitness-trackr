import { act, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activity, activities, syncActivities }) {
  const { token } = useAuth();

  const [error, setError] = useState(null);

  const tryDeleteActivity = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <ul>
      {token
        ? activities.map((activity) => (
            <div>
              <li key={activity.id}>{activity.name}</li>
              <button onClick={tryDeleteActivity}>Delete</button>
            </div>
          ))
        : activities.map((activity) => (
            <li key={activity.id}>{activity.name}</li>
          ))}
    </ul>
  );
}
