import React, { useState } from 'react';
import { IMAGEBOOK_PAGES } from '../../mocks/imagebook.mock';
//import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './ibook_style.css';

const TOTAL_PAGES = IMAGEBOOK_PAGES.length;

const ImageBookViewer: React.FC = () => {
    const [page, setPage] = useState(0);

    const goPrev = () => setPage((p) => Math.max(0, p - 1));
    const goNext = () => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1));

    const progress = Math.round(((page + 1) / TOTAL_PAGES) * 100);

    const { image, texts } = IMAGEBOOK_PAGES[page];

    return (
    <div className="imagebook-viewer">
        <div className="imagebook-bg" style={{backgroundImage: `url(${image})`,}}>
            {/* Progress Bar */}
            <div className="imagebook-progress-bar-bg">
                <div className="imagebook-progress-bar" style={{ width: `${progress}%` }}/>
            </div>
            <div className="imagebook-progress-label">
                {progress}%
            </div>

            {/* 텍스트 */}
            <div className="imagebook-text">
                {texts.map((line, idx) => (
                    <div key={idx} className="imagebook-text-line">
                    {line}
                    </div>
                ))}
            </div>

            {/* 화살표 */}
            <button onClick={goPrev} disabled={page === 0} className="imagebook-arrow left" aria-label="Prev Page">
                ◀
            </button>
            <button onClick={goNext} disabled={page === TOTAL_PAGES - 1} className="imagebook-arrow right" aria-label="Next Page">
                ▶
            </button>
        </div>
    </div>
    );
};

export default ImageBookViewer;