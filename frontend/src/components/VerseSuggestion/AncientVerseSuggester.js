import React, { useState, useEffect } from 'react';
import { Search, Plus, X, Sparkles, Scroll, Heart, Sword, Star, Moon, Sun, Crown, Shield, BookOpen, Feather, PlusIcon } from 'lucide-react';
import './AncientVerseSuggester.css';
import axios from 'axios';
import Book from '../Scripture/Book/Book';
import VerseList from '../Verse/VerseList/VerseList';

const AncientVerseSuggester = () => {
    const [selectedWords, setSelectedWords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [customWord, setCustomWord] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [suggestedVerses, setSuggestedVerses] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [filteredKeywords, setFilteredKeywords] = useState([]);
    const [keyWords, setKeyWords] = useState([]);
    const [predefinedKeywords, setPredefinedKeywords] = useState([]);
    const [verses, setVerses] = useState([]);
    const defaultCategory = 'custom';
    const defaultIcon = PlusIcon;

    // Predefined magical keywords with categories
    // const pre = [
    //     // Love & Romance
    //     { word: 'love', category: 'love', icon: Heart },
    //     { word: 'romance', category: 'love', icon: Heart },
    //     { word: 'passion', category: 'love', icon: Heart },
    //     { word: 'devotion', category: 'love', icon: Heart },
    //     { word: 'heart', category: 'love', icon: Heart },
    //     { word: 'beloved', category: 'love', icon: Heart },

    //     // War & Battle
    //     { word: 'war', category: 'war', icon: Sword },
    //     { word: 'battle', category: 'war', icon: Sword },
    //     { word: 'courage', category: 'war', icon: Shield },
    //     { word: 'honor', category: 'war', icon: Crown },
    //     { word: 'victory', category: 'war', icon: Crown },
    //     { word: 'warrior', category: 'war', icon: Sword },

    //     // Soul & Spirituality
    //     { word: 'soul', category: 'soul', icon: Star },
    //     { word: 'spirit', category: 'soul', icon: Star },
    //     { word: 'divine', category: 'soul', icon: Sun },
    //     { word: 'wisdom', category: 'soul', icon: BookOpen },
    //     { word: 'eternal', category: 'soul', icon: Moon },
    //     { word: 'transcendent', category: 'soul', icon: Star },

    //     // Nature & Elements
    //     { word: 'moon', category: 'nature', icon: Moon },
    //     { word: 'sun', category: 'nature', icon: Sun },
    //     { word: 'stars', category: 'nature', icon: Star },
    //     { word: 'ocean', category: 'nature', icon: Moon },
    //     { word: 'mountain', category: 'nature', icon: Crown },
    //     { word: 'forest', category: 'nature', icon: Star },

    //     // Mystical & Magic
    //     { word: 'magic', category: 'mystical', icon: Sparkles },
    //     { word: 'enchanted', category: 'mystical', icon: Sparkles },
    //     { word: 'mystical', category: 'mystical', icon: Star },
    //     { word: 'ancient', category: 'mystical', icon: Scroll },
    //     { word: 'prophecy', category: 'mystical', icon: BookOpen },
    //     { word: 'destiny', category: 'mystical', icon: Star }
    // ];
    // console.log(pre);
    // Sample verses for demonstration
    const sampleVerses = {
        love: [
            "In the garden of my heart, thy love blooms eternal,\nLike roses kissed by morning dew.",
            "Two souls entwined beneath the starlit sky,\nBound by threads of golden light.",
            "Love's sweet whisper echoes through the ages,\nA melody that time cannot erase."
        ],
        war: [
            "Steel rings against steel in the dawn's early light,\nCourage flows like rivers through brave hearts.",
            "Upon the battlefield of honor,\nWarriors write their names in starlight.",
            "Victory's crown awaits those who dare,\nTo face the storm with unwavering spirit."
        ],
        soul: [
            "Within the depths of quietude dwells wisdom,\nAncient as the mountains, deep as the sea.",
            "The soul's journey transcends mortal bounds,\nSeeking truth in realms beyond sight.",
            "In meditation's sacred silence,\nThe divine spark awakens within."
        ],
        nature: [
            "The moon weaves silver dreams across the sky,\nWhile stars dance in celestial harmony.",
            "Mountains stand as sentinels of time,\nGuarding secrets of the ancient earth.",
            "Ocean waves carry messages from distant shores,\nSongs of depth and mystery."
        ],
        mystical: [
            "Magic flows through every living thing,\nA web of light connecting all existence.",
            "In the realm where prophecies are born,\nDestiny writes its golden script.",
            "Ancient wisdom sleeps in sacred groves,\nAwaiting those who seek with pure intent."
        ]
    };

    const fetchKeyWords = () => {
        axios.get('http://localhost:5000/model')
            .then(response => {
                console.log(response.data[0].keywords);
                const uniqueWords = [...new Set(response.data[0].keywords)];

                setKeyWords(uniqueWords);
                const prekeyword = uniqueWords.map(word => ({ word, category: defaultCategory, icon: defaultIcon }));
                setPredefinedKeywords(prekeyword);
                setFilteredKeywords(prekeyword);
            })
            .catch(error => {
                console.log("Error while fetching keywords" + error);
            })
    }

    useEffect(() => {
        if (searchTerm) {
            const filtered = predefinedKeywords.filter(keyword =>
                keyword.word.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredKeywords(filtered);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchKeyWords();
    }, []);

    const addSelectedWord = (word, category = 'custom') => {
        if (!selectedWords.find(w => w.word === word)) {
            const IconComponent = predefinedKeywords.find(k => k.word === word)?.icon || Feather;
            setSelectedWords([...selectedWords, { word, category, icon: IconComponent }]);
        }
    };

    const removeSelectedWord = (wordToRemove) => {
        setSelectedWords(selectedWords.filter(w => w.word !== wordToRemove));
    };

    const addCustomWord = () => {
        if (customWord.trim()) {
            addSelectedWord(customWord.trim().toLowerCase());
            setCustomWord('');
            setShowCustomInput(false);
        }
    };

    const generateVerses = async () => {
        if (selectedWords.length === 0) return;

        setIsGenerating(true);

        const req = {
            keywords: selectedWords.map(w => w.word)
        }

        axios.post('http://localhost:5000/model/suggest', req)
            .then(response => {
                // console.log(response);
                console.log(response.data);
                setSuggestedVerses(response.data);
                setVerses(response.data.slice(0, 20));
            })
            .catch(error => {
                console.log(error);
            });
        // Simulate AI generation delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate verses based on selected words
        const categories = [...new Set(selectedWords.map(w => w.category))];
        const generatedVerses = [];

        categories.forEach(category => {
            if (sampleVerses[category]) {
                generatedVerses.push(...sampleVerses[category]);
            }
        });

        // Add some AI-generated style verses
        // const aiVerses = [
        //     `In realms where ${selectedWords[0]?.word} meets the divine,\nAncient whispers carry truth sublime.`,
        //     `Through ${selectedWords.map(w => w.word).join(', ')},\nThe poet's quill finds its sacred voice.`,
        //     `Behold the tapestry woven with ${selectedWords.slice(0, 3).map(w => w.word).join(', ')},\nEach thread a story, each story a song.`
        // ];

        // setSuggestedVerses([...generatedVerses, ...aiVerses]);
        setIsGenerating(false);
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'love': return Heart;
            case 'war': return Sword;
            case 'soul': return Star;
            case 'nature': return Moon;
            case 'mystical': return Sparkles;
            default: return Feather;
        }
    };

    const getCategoryClass = (category) => {
        switch (category) {
            case 'love': return 'love-keyword';
            case 'war': return 'war-keyword';
            case 'soul': return 'soul-keyword';
            case 'nature': return 'nature-keyword';
            case 'mystical': return 'mystical-keyword';
            default: return 'custom-keyword';
        }
    };

    return (
        <div className="ancient-verse-container">
            <div className="verse-manuscript">
                {/* Header */}
                {console.log(predefinedKeywords)}
                <div className="manuscript-header">
                    <h1 className="verse-title">
                        <Sparkles className="title-icon" />
                        Ancient AI Verse Oracle
                        <BookOpen className="title-icon" />
                    </h1>
                    <div className="illuminated-divider"></div>
                    <p className="subtitle">Weave words into mystical verses with the power of ancient AI magic</p>
                </div>
                {console.log(verses)}
                {/* Selected Words Display */}
                {selectedWords.length > 0 && (
                    <div className="selected-words-scroll">
                        <div className="selected-header">
                            <Scroll className="scroll-icon" />
                            <span>Selected Mystical Words</span>
                        </div>
                        <div className="selected-words-grid">
                            {selectedWords.map((wordObj, index) => {
                                const IconComponent = wordObj.icon;
                                return (
                                    <div key={index} className={`selected-word-rune ${getCategoryClass(wordObj.category)}`}>
                                        <IconComponent className="word-icon" size={16} />
                                        <span className="word-text">{wordObj.word}</span>
                                        <button
                                            className="remove-word-btn"
                                            onClick={() => removeSelectedWord(wordObj.word)}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Search Section */}
                <div className="search-grimoire">
                    <div className="search-container">
                        <div className="search-input-wrapper">
                            <Search className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for mystical words..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="ancient-search-input"
                            />
                        </div>
                        <button
                            className="add-custom-btn"
                            onClick={() => setShowCustomInput(!showCustomInput)}
                        >
                            <Plus size={16} />
                            Add Custom
                        </button>
                    </div>

                    {/* Custom Word Input */}
                    {showCustomInput && (
                        <div className="custom-word-form">
                            <div className="custom-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Enter your mystical word..."
                                    value={customWord}
                                    onChange={(e) => setCustomWord(e.target.value)}
                                    className="custom-word-input"
                                    onKeyPress={(e) => e.key === 'Enter' && addCustomWord()}
                                />
                                <button onClick={addCustomWord} className="add-word-btn">
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Keywords Grid */}
                <div className="keywords-scroll-area">
                    <div className="keywords-categories">
                        <div className="keywords-grid">
                            {filteredKeywords.map((keyword, index) => {
                                const IconComponent = keyword.icon;
                                const isSelected = selectedWords.find(w => w.word === keyword.word);
                                return (
                                    <button
                                        key={index}
                                        className={`keyword-rune ${getCategoryClass(keyword.category)} ${isSelected ? 'selected' : ''}`}
                                        onClick={() => addSelectedWord(keyword.word, keyword.category)}
                                        disabled={isSelected}
                                    >
                                        <IconComponent className="keyword-icon" size={18} />
                                        <span className="keyword-text">{keyword.word}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Generate Button */}
                <div className="generate-section">
                    <button
                        className="mystical-generate-btn"
                        onClick={generateVerses}
                        disabled={selectedWords.length === 0 || isGenerating}
                    >
                        {isGenerating ? (
                            <>
                                <div className="magical-spinner"></div>
                                Channeling Ancient Magic...
                            </>
                        ) : (
                            <>
                                <Sparkles className="generate-icon" />
                                Conjure Mystical Verses
                                <Sparkles className="generate-icon" />
                            </>
                        )}
                    </button>
                </div>

                {/* Generated Verses */}
                {suggestedVerses.length > 0 && (
                    <div className="verses-manuscript">
                        <div className="verses-header">
                            <Scroll className="verses-icon" />
                            <h3>Mystical Verses Conjured by Ancient AI</h3>
                            <Scroll className="verses-icon" />
                        </div>
                        <VerseList
                            // onAddVerse={handleChangeFetch}
                            verses={verses}
                        ></VerseList>

                        {/* <div className="verses-scroll-area">
                            {suggestedVerses.map((verse, index) => (
                                <div key={index} className="verse-parchment">
                                    <div className="verse-number">Verse {index + 1}</div>
                                    <div className="verse-content">
                                        {verse.split('\n').map((line, lineIndex) => (
                                            <div key={lineIndex} className="verse-line">{line}</div>
                                        ))}
                                    </div>
                                    <div className="verse-ornament">✦</div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AncientVerseSuggester;