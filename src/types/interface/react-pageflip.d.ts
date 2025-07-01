//react-pageflip
declare module 'react-pageflip' {
    import * as React from 'react';

    export interface HTMLFlipBookProps extends React.HTMLAttributes<HTMLDivElement> {
        width: number;
        height: number;
        size?: 'fixed' | 'stretch';
        minWidth?: number;
        maxWidth?: number;
        minHeight?: number;
        maxHeight?: number;
        maxShadowOpacity?: number;
        showCover?: boolean;
        mobileScrollSupport?: boolean;
        useMouseEvents?: boolean;
        usePortrait?: boolean;
        flippingTime?: number;
        startPage?: number;
        className?: string;
        onFlip?: (e: any) => void;
        style?: React.CSSProperties;
    }
    export default class HTMLFlipBook extends React.Component<HTMLFlipBookProps> {}
}