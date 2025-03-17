import { Link } from 'react-router-dom';
import "../components/Goals/goals.css";

export default function GoalsPage() {
  return (
    <div>
      <button>
        <Link to={'/addgoal'}>+ New Goal</Link>
      </button>
    </div>
  );
}