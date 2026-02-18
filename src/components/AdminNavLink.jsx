import React, { useState, useEffect, useRef } from 'react';

const AdminNavLink = ({ name, icon: Icon, active, onClick }) => {
    const [displayText, setDisplayText] = useState(name);
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (isHovered && !active) {
            // Loop typing effect when hovered and not active
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
    }, [isHovered, name, active]);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${active
                    ? 'text-accent-blue bg-accent-blue/10 dark:bg-accent-blue/20'
                    : 'text-muted hover:text-foreground hover:bg-background'
                }`}
        >
            <Icon size={20} />
            <span className="flex-1 text-left">{displayText}</span>
            {isHovered && !active && (
                <span className="inline-block w-1 h-3 bg-accent-blue ml-0.5 animate-pulse" />
            )}
        </button>
    );
};

export default AdminNavLink;
