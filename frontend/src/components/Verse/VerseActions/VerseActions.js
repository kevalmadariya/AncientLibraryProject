import { Edit3, Trash2 } from 'lucide-react';
import '../Verse.css';

const VerseActions = ({ onEdit, onDelete }) => {
    return (
        <div className="verse-actions">
            <button className="ancient-edit-btn" onClick={onEdit}>
                <Edit3 size={16} />
                Edit
            </button>
            <button className="ancient-delete-btn" onClick={onDelete}>
                <Trash2 size={16} />
                Delete
            </button>
        </div>
    );
};

export default VerseActions;