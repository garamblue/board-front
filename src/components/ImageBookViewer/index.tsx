import React, { useEffect, useRef, useState } from 'react';
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
    
    // reference: 
    const bookRef = useRef<any>(null);

    // state: 현재 page
    const [currentPage, setCurrentPage] = useState(0);
    
    // state: text 접힘상태
    const textRef = useRef<HTMLDivElement>(null);
    //const [isTextVisible, setIsTextVisible] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [textHeight, setTextHeight] = useState(0);

    const handleFlip = (e: any) => {
        //e.data - 현재 페이지 인덱스
        setCurrentPage(e.data);
        console.log(e.data);
    };

    const toggleOnClickHandler = () => {
        //setIsTextVisible(!isTextVisible);
        setIsCollapsed((prev) => !prev);
        //console.log(`isTextVisible: ${isTextVisible}`);
    };

    //진행률
    const progress = Math.round(((currentPage + 1) / TOTAL_PAGES) * 100);
    const [page, setPage] = useState(0);
    
    const prev = () => bookRef.current.pageFlip().flipPrev();
    const next = () => bookRef.current.pageFlip().flipNext();
    // const goPrev = () => setPage((p) => Math.max(0, p - 1));
    // const goNext = () => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1));

    // useEffect: 텍스트 영역 높이 측정
    // useEffect(() => {
    //     console.log(`textRef.current: ${textRef.current}`);
    //     if (textRef.current) {
    //         const resizeObserver = new ResizeObserver((entries) => {
    //             for (let entry of entries) {
    //                 setTextHeight(entry.contentRect.height);
    //                 console.log(`setTextHeight: ${entry.contentRect.height}`);
    //             }
    //         });
            
    //         resizeObserver.observe(textRef.current);
            
    //         return () => {
    //             resizeObserver.disconnect();
    //         };
    //     }
    // }, []);

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
                                <div className={`card-text-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
                                    {/* toggle 영역 */}
                                    {/* 
                                    <div className="card-toggle-wrapper">
                                        <div className="card-toggle" onClick={toggleOnClickHandler}>
                                            {isCollapsed ? '∧' : '∨'}
                                        </div>
                                    </div> */}
                                    <div className="card-toggle-wrapper">
                                        <button className="text-toggle-btn" onClick={toggleOnClickHandler}
                                            aria-label={isCollapsed ? "text hide" : "text show"}
                                        >
                                            {isCollapsed ? '∧' : '∨'}
                                        </button>
                                    </div>
                                    
                                    {/* text 영역 */}
                                    {!isCollapsed && (
                                        <div className="imagebook-text">
                                            {page.texts.map((line, i) => (
                                                <div key={i} className="imagebook-text-line">
                                                    {line}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                
                                {/* <div ref={textRef} className={`imagebook-text ${isTextVisible ? 'text-visible' : 'text-hidden'}`}>
                                </div> */}
                            </div>
                        </div>
                    </Page>
                ))}
            </HTMLFlipBook>

            <button className="flip-button right" onClick={next} disabled={currentPage >= (TOTAL_PAGES-1)}>
                <ChevronRight size={32} />
            </button>
        </div>

    
    );
};

export default ImageBookViewer;