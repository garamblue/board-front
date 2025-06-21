import { ChangeEvent, forwardRef, KeyboardEvent } from 'react';
import './style.css';

// interface: Props interface for InputBox component
interface Props {
    label: string;
    type: 'text' | 'password';
    value: string;
    error: boolean;
    placeholder: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

    icon?: 'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon';
    message?: string;
    onButtonClick?: () => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

// component: InputBox component
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    
    // properties
    const { label, type, error, placeholder, value, icon, message, ...inputProps } = props;
    const { onChange, onButtonClick, onKeyDown } = props;

    // event handler: input 값 변경 이벤트 처리
    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { value } = event.target;
    //     props.setValue(value);
    // }

    // event handler: 키보드 이벤트 처리
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        // if (event.key === 'Enter') {
        //     onButtonClick?.();
        // }
        if (!onKeyDown) return;
        onKeyDown(event);
    }

    // render: InputBox component rendering
    return (
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
                <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler} />
                {onButtonClick !== undefined && (
                    <div className='icon-button' onClick={onButtonClick}>
                        {icon !== undefined && (<div className={`icon ${icon}`}></div>)}
                    </div>
                )}
            </div>
            {message !== undefined && <div className='inputbox-message'>{message}</div>}
        </div>
    );
});

export default InputBox;
