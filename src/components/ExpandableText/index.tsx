import React, {useEffect, useRef, useState} from 'react';

interface IProps {
    text: string
}

const ExpandableText = ({ text }: IProps) => {
    const [expanded, setExpanded] = useState(false);
    const [isExpandedVisile, setIsExpandedVisile] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    const toggleExpanded = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    useEffect(() => {
        requestAnimationFrame(checkOverflow);
    }, []);


    const checkOverflow = () => {
        if (textRef.current && spanRef.current) {
            const textHeight = textRef.current.getBoundingClientRect().height;
            const spanHeight = spanRef.current.getBoundingClientRect().height;
            const isOverflowing = spanHeight - textHeight > 1.5;

            if (isOverflowing) {
                setIsExpandedVisile(true);
            }
            else {
                setIsExpandedVisile(false);
            }
        }
    };

    return (
        <div>
            <p ref={textRef} 
                className={`overflow-hidden ${expanded ? 'max-h-full' : 'max-h-14'} text-gray-600 mb-1 text-sm leading-snug text-justify `}
            >
                <span ref={spanRef}>
                    {text}
                </span>
            </p>
            {isExpandedVisile && !expanded && (
                <button
                    className="text-orange-500/70 hover:underline"
                    onClick={toggleExpanded}
                >
                    Read more
                </button>
            )}
            {isExpandedVisile && expanded && (
                <button
                    className="text-orange-500/70 hover:underline"
                    onClick={toggleExpanded}
                >
                    Less
                </button>
            )}
        </div>
    );
};

export default ExpandableText;
