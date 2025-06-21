import { ChevronDown, ChevronUp } from 'lucide-react';
import '../Verse.css';

const VerseHeader = ({ verse, isExpanded, onToggle }) => {
    return (
        <div className="verse-header-parchment" onClick={onToggle}>
            <div className="verse-header-content">
                <div className="verse-title-section">
                    <span className="verse-number">Verse {verse.verse_no}</span>
                    <span className="sanskrit-preview">
                        {verse.sanskrit_script.split('\\n')[0]}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#8a7246', fontSize: '1.2rem' }}>📜</span>
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                </div>
            </div>
        </div>
    );
};

export default VerseHeader;