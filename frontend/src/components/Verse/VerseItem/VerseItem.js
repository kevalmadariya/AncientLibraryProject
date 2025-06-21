import VerseHeader from '../VerseHeader/VerseHeader';
import VerseActions from '../VerseActions/VerseActions';
import '../Verse.css';
import VerseContent from '../VerseContent/VerseContent';

const VerseItem = ({ verse, isExpanded, onToggle, onEdit, onDelete, onAddComment }) => {
    return (
        <div className="ancient-verse-scroll">
            <VerseHeader
                verse={verse}
                isExpanded={isExpanded}
                onToggle={onToggle}
            />
            {isExpanded && (
                <div className="verse-content-manuscript">
                    <VerseContent
                        verse={verse}
                        onAddComment={onAddComment}
                    />

                    <VerseActions
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            )}
        </div>
    );
};

export default VerseItem;