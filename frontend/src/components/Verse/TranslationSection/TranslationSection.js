import '../Verse.css';

const TranslationSection = ({ verse, translationMode, onToggleTranslation }) => {
    return (
        <>
            <div className="translation-controls">
                <button
                    className={`translation-btn ${translationMode === 'hindi' ? 'active' : ''}`}
                    onClick={() => onToggleTranslation('hindi')}
                >
                    हिंदी Translation
                </button>
                <button
                    className={`translation-btn ${translationMode === 'english' ? 'active' : ''}`}
                    onClick={() => onToggleTranslation('english')}
                >
                    English Translation
                </button>
            </div>

            {translationMode === 'hindi' && (
                <div className="translation-text">
                    {verse.hindi_translation}
                </div>
            )}

            {translationMode === 'english' && (
                <div className="translation-text">
                    {verse.english_translation}
                </div>
            )}
        </>
    );
};

export default TranslationSection;