import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useBoardStore, useLoginUserStore } from 'stores';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';

// component: 게시물 작성 component
export default function BoardWrite() {
    // state: 본문영역 요소 참조 상태
    const titleRef = useRef<HTMLTextAreaElement | null>(null);

    // state: 본문영역 요소 참조 상태
    const contentRef = useRef<HTMLTextAreaElement | null>(null);

    // state: image input 요소 참조 상태
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    // state: 게시물 상태
    const { title, setTitle } = useBoardStore();
    const { content, setContent } = useBoardStore();
    const { boardImageFileList, setBoardImageFileList } = useBoardStore();
    const { resetBoard } = useBoardStore();

    // state: 게시물 이미지 미리보기 url 상태
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    // state: login user 상태
    const { loginUser } = useLoginUserStore();

    // function: 네비게이트 함수
    const navigator = useNavigate();

    // event handler function: title text 입력 시 발생
    const titleOnChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = event.target;
        setTitle(value);
        if(!titleRef.current) return;
        titleRef.current.style.height = 'auto';
        titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }

    // event handler function: content 입력 시 발생
    const contentOnChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = event.target;
        setContent(value);
        if(!contentRef.current) return;
        contentRef.current.style.height = 'auto';
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }

    // event handler function: image upload button click event
    const imageUploadBtnClickHandler = () => {
        if(!imageInputRef.current) return;
        imageInputRef.current.click();
    }

    // event handler function: image change event
    const imageOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];
        
        // 이미지 미리보기 URL 생성
        const imageUrl = URL.createObjectURL(file);
        setImageUrls((prev) => [...prev, imageUrl]);

        // 파일 객체 저장
        const newBoardImageFileList = boardImageFileList.map(item => item);
        newBoardImageFileList.push(file);
        setBoardImageFileList(newBoardImageFileList);

        //42. 게시물 작성 페이지 API 연동
        if(!imageInputRef.current) return;
        imageInputRef.current.value = '';
    }

    // event handler: image close button click
    const imageCloseBtnOnClickHandler = (deleteIndex: number) => {
        if(!imageInputRef.current) return;
        imageInputRef.current.value = '';

        const newImageUrls = imageUrls.filter((url, index) => index !== deleteIndex);
        setImageUrls(newImageUrls);

        const newBoardImageFileList = boardImageFileList.filter((file, index) => index !== deleteIndex);
        setBoardImageFileList(newBoardImageFileList);
    }


    // effect: 첫 loading 시 실행할 함수
    useEffect(() => {
        //login 되어 있지 않으면 들어오지 못하게 막음
        if(!loginUser) {
            navigator(MAIN_PATH());
            return;
        }
        resetBoard();
    }, []);

    // rendering the component //
    return (
        <div id='board-write-wrapper'>
            <div className='board-write-container'>
                <div className='board-write-box'>
                    <div className='board-write-title-box'>
                        <textarea ref={titleRef} className='board-write-title-textarea' placeholder='제목을 입력하세요.' rows={1}
                            value={title} onChange={titleOnChangeHandler}/>
                    </div>
                    <div className='divider'></div>
                    <div className='board-write-content-box'>
                        <textarea ref={contentRef} className='board-write-content-textarea' placeholder='본문을 작성하세요.'
                            value={content} onChange={contentOnChangeHandler} />
                        <div className='icon-button' onClick={imageUploadBtnClickHandler}>
                            <div className="icon image-box-light-icon"></div>
                        </div>
                        <input ref={imageInputRef} type='file' accept='image/*' 
                            style={{ display: 'none'}} onChange={imageOnChangeHandler}/>
                    </div>
                    <div className="board-write-images-box">
                        {imageUrls.map((imageUrl, index) =>
                            <div className="board-write-image-box">
                                <img key={index} 
                                    src={imageUrl} 
                                    alt={`preview-${index}`}
                                    style={{ width: '50%', height: '50%', objectFit: 'cover', marginRight: '8px' }} />
                                <div className="icon-button image-close" onClick={() => imageCloseBtnOnClickHandler(index)}>
                                    <div className="icon close-icon"></div>
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

