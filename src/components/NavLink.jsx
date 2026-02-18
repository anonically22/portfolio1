import { useState, useEffect, useRef } from 'react';

const NavLink = ({ name, href }) => {
    const [displayText, setDisplayText] = useState(name);
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (isHovered) {
            // Loop typing effect when hovered
            let index = 0;
            let deleting = false;
            const speed = 70;

            const type = () => {
                if (!deleting) {
                    if (index <= name.length) {
                        setDisplayText(name.slice(0, index));
                        index++;
                        timeoutRef.current = setTimeout(type, speed);
                    } else {
                        timeoutRef.current = setTimeout(() => {
                            deleting = true;
                            type();
                        }, 1000);
                    }
                } else {
                    if (index >= 0) {
                        setDisplayText(name.slice(0, index));
                        index--;
                        timeoutRef.current = setTimeout(type, speed / 2);
                    } else {
                        deleting = false;
                        index = 0;
                        timeoutRef.current = setTimeout(type, speed);
                    }
                }
            };

            type();
        } else {
            clearTimeout(timeoutRef.current);
            setDisplayText(name);
        }

        return () => clearTimeout(timeoutRef.current);
    }, [isHovered, name]);

    return (
        <a
            href={href}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-sm font-medium text-muted hover:text-foreground transition-colors min-w-[60px]"
        >
            {displayText}
            <span className="inline-block w-1 h-3 bg-accent-blue ml-0.5 animate-pulse" style={{ opacity: isHovered ? 1 : 0 }} />
        </a>
    );
};

export default NavLink;
