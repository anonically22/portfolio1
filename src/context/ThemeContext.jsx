import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ThemeContext = createContext();

export const PREDEFINED_COLORS = {
    Blue: "#2563EB",
    Purple: "#7C3AED",
    Amber: "#F59E0B",
    Emerald: "#10B981",
    Red: "#EF4444",
    Cyan: "#06B6D4",
};

const DEFAULT_COLOR = PREDEFINED_COLORS.Blue;

export const ThemeProvider = ({ children }) => {
    const [accentColor, setAccentColor] = useState(DEFAULT_COLOR);
    const [randomMode, setRandomMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const generateGradient = (hex) => {
        // Basic lighter shade logic (simplistic implementation)
        // For a real production app, you might use a library like 'chroma-js' or 'tinycolor2'
        // but here we'll do a simple opacity-based or hardcoded-ish lighter variant
        // Since we have predefined colors, we can also just map them to secondary colors
        const secondaryColors = {
            "#2563EB": "#60A5FA", // Blue -> Light Blue
            "#7C3AED": "#A78BFA", // Purple -> Light Purple
            "#F59E0B": "#FCD34D", // Amber -> Light Amber
            "#10B981": "#34D399", // Emerald -> Light Emerald
            "#EF4444": "#F87171", // Red -> Light Red
            "#06B6D4": "#22D3EE", // Cyan -> Light Cyan
        };

        const secondary = secondaryColors[hex] || hex;
        return `linear-gradient(135deg, ${hex} 0%, ${secondary} 100%)`;
    };

    const applyTheme = (color) => {
        const gradient = generateGradient(color);
        document.documentElement.style.setProperty('--accent-color', color);
        document.documentElement.style.setProperty('--accent-gradient', gradient);

        // Smooth transition helper
        document.documentElement.classList.add('theme-transitioning');
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 400);

        console.log(`Theme Applied: ${color}`);
    };

    const fetchTheme = async () => {
        try {
            const { data, error } = await supabase
                .from('sections')
                .select('content_json')
                .eq('section_type', 'theme')
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching theme:', error);
            }

            if (data && data.content_json) {
                const { accent_color, random_mode } = data.content_json;
                setRandomMode(random_mode || false);

                if (random_mode) {
                    const colors = Object.values(PREDEFINED_COLORS);
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    setAccentColor(randomColor);
                    applyTheme(randomColor);
                } else {
                    const color = accent_color || DEFAULT_COLOR;
                    setAccentColor(color);
                    applyTheme(color);
                }
            } else {
                // Default if no record
                applyTheme(DEFAULT_COLOR);
            }
        } catch (err) {
            console.error('Theme fetch failed:', err);
            applyTheme(DEFAULT_COLOR);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTheme();
    }, []);

    const updateTheme = async (newColor, newRandomMode) => {
        setAccentColor(newColor);
        setRandomMode(newRandomMode);

        if (!newRandomMode) {
            applyTheme(newColor);
        } else {
            const colors = Object.values(PREDEFINED_COLORS);
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            applyTheme(randomColor);
        }

        try {
            // First check if it exists to get the ID
            const { data } = await supabase
                .from('sections')
                .select('id')
                .eq('section_type', 'theme')
                .single();

            if (data) {
                await supabase
                    .from('sections')
                    .update({
                        content_json: { accent_color: newColor, random_mode: newRandomMode },
                        updated_at: new Date()
                    })
                    .eq('id', data.id);
            } else {
                await supabase
                    .from('sections')
                    .insert({
                        section_name: 'theme',
                        section_type: 'theme',
                        content_json: { accent_color: newColor, random_mode: newRandomMode },
                    });
            }
        } catch (err) {
            console.error('Error saving theme:', err);
        }
    };

    return (
        <ThemeContext.Provider value={{ accentColor, randomMode, updateTheme, loading }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
