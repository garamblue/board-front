import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGEBOOK_PAGES } from '../../mocks/imagebook.mock';
import './ibook_style.css';

const TOTAL_PAGES = IMAGEBOOK_PAGES.length;

const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
    ({ children }, ref) => (
        <div className="sketchbook-page" ref={ref}>
        {children}
        </div>
    )
);


const ImageBookViewer: React.FC = () => {
    
    // useRef: 
    const bookRef = useRef<any>(null);

    const [currentPage, setCurrentPage] = useState(0);
    const handleFlip = (e: any) => {
        //e.data - 현재 페이지 인덱스
        setCurrentPage(e.data);
        console.log(e.data);
    };

    //진행률
    const progress = Math.round(((currentPage + 1) / TOTAL_PAGES) * 100);
    const [page, setPage] = useState(0);
    
    // const { image, texts } = IMAGEBOOK_PAGES[page];

    const prev = () => bookRef.current.pageFlip().flipPrev();
    const next = () => bookRef.current.pageFlip().flipNext();
    // const goPrev = () => setPage((p) => Math.max(0, p - 1));
    // const goNext = () => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1));

    return (
        <div className="sketchbook-container">
            <div className="imagebook-progress-newlabel">
            {progress}%
            </div>

            <button className="flip-button left" onClick={prev} disabled={currentPage <= 0}>
                <ChevronLeft size={32} />
            </button>

            <HTMLFlipBook
                width={400}
                height={550}
                size="stretch"
                minWidth={300}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1000}
                showCover={false}
                mobileScrollSupport={true}
                usePortrait={true}
                flippingTime={800}
                maxShadowOpacity={0.4}
                onFlip={handleFlip}
                ref={bookRef}
                className="sketchbook">
                {IMAGEBOOK_PAGES.map((page, idx) => (
                    <Page>
                        <div className="imagebook-page" key={idx}>
                            <div className="imagebook-bg" style={{backgroundImage: `url(${page.image})`,}}>
                                <div className="imagebook-text">
                                {page.texts.map((line, i) => (
                                    <div key={i} className="imagebook-text-line">
                                        {line}
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </Page>
                ))}
            </HTMLFlipBook>

            <button className="flip-button right" onClick={next} disabled={currentPage >= (TOTAL_PAGES-1)}>
                <ChevronRight size={32} />
            </button>
        </div>

    // <div className="imagebook-viewer">
    //     <div className="imagebook-bg" style={{backgroundImage: `url(${image})`,}}>
    //         {/* Progress Bar */}
    //         <div className="imagebook-progress-bar-bg">
    //             <div className="imagebook-progress-bar" style={{ width: `${progress}%` }}/>
    //         </div>
    //         <div className="imagebook-progress-label">
    //             {progress}%
    //         </div>

    //         {/* 텍스트 */}
    //         <div className="imagebook-text">
    //             {texts.map((line, idx) => (
    //                 <div key={idx} className="imagebook-text-line">
    //                 {line}
    //                 </div>
    //             ))}
    //         </div>

    //         {/* 화살표 */}
    //         <button onClick={goPrev} disabled={page === 0} className="imagebook-arrow left" aria-label="Prev Page">
    //             ◀
    //         </button>
    //         <button onClick={goNext} disabled={page === TOTAL_PAGES - 1} className="imagebook-arrow right" aria-label="Next Page">
    //             ▶
    //         </button>
    //     </div>
    // </div>
    );
};

export default ImageBookViewer;