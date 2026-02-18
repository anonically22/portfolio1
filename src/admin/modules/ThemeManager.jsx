import React, { useState } from 'react';
import { useTheme, PREDEFINED_COLORS } from '../../context/ThemeContext';
import { Save, Loader2, Palette, RefreshCw, Check } from 'lucide-react';

const ThemeManager = () => {
    const { accentColor, randomMode, updateTheme, loading } = useTheme();
    const [selectedColor, setSelectedColor] = useState(accentColor);
    const [isRandom, setIsRandom] = useState(randomMode);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await updateTheme(selectedColor, isRandom);
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-accent-blue" size={40} />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            <div>
                <h2 className="text-3xl font-display font-bold tracking-tight">Theme Settings</h2>
                <p className="text-muted">Customize the look and feel of your portfolio.</p>
            </div>

            <div className="p-8 glass-light rounded-3xl border border-border shadow-sm space-y-8">
                {/* Color Selection */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent-blue/10 text-accent-blue rounded-xl">
                            <Palette size={20} />
                        </div>
                        <h3 className="text-xl font-bold">Accent Color</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Object.entries(PREDEFINED_COLORS).map(([name, hex]) => (
                            <button
                                key={hex}
                                onClick={() => setSelectedColor(hex)}
                                disabled={isRandom}
                                className={`relative group flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${selectedColor === hex && !isRandom
                                    ? 'border-accent-blue bg-accent-blue/5'
                                    : 'border-transparent bg-background hover:border-border'
                                    } ${isRandom ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <div
                                    className="w-10 h-10 rounded-full shadow-inner"
                                    style={{ backgroundColor: hex }}
                                >
                                    {selectedColor === hex && !isRandom && (
                                        <div className="w-full h-full flex items-center justify-center text-white">
                                            <Check size={20} />
                                        </div>
                                    )}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest">{name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <hr className="border-border" />

                {/* Random Mode Toggle */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent-blue/10 text-accent-blue rounded-xl">
                                <RefreshCw size={20} />
                            </div>
                            <h3 className="text-xl font-bold">Random Accent Mode</h3>
                        </div>
                        <p className="text-sm text-muted">Automatically pick a new accent color on every page load.</p>
                    </div>

                    <button
                        onClick={() => setIsRandom(!isRandom)}
                        className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${isRandom ? 'bg-accent-blue' : 'bg-muted/30'
                            }`}
                    >
                        <div
                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm ${isRandom ? 'translate-x-6' : 'translate-x-0'
                                }`}
                        />
                    </button>
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-4 bg-accent-blue text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-accent-blue/20 transition-all disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        {saving ? 'Saving...' : 'Save Theme Settings'}
                    </button>
                </div>
            </div>

            {/* Preview Section */}
            <div className="p-8 glass-light rounded-3xl border border-border shadow-sm space-y-6">
                <h3 className="text-xl font-bold">Live Preview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <p className="text-sm font-bold text-muted uppercase tracking-widest">Buttons & Text</p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                className="px-6 py-2 rounded-xl bg-accent-blue text-white font-bold"
                                style={{ backgroundColor: isRandom ? 'var(--accent-color)' : selectedColor }}
                            >
                                Primary Button
                            </button>
                            <button
                                className="px-6 py-2 rounded-xl border-2 border-accent-blue text-accent-blue font-bold"
                                style={{ borderColor: isRandom ? 'var(--accent-color)' : selectedColor, color: isRandom ? 'var(--accent-color)' : selectedColor }}
                            >
                                Secondary
                            </button>
                        </div>
                        <p className="text-accent-blue font-bold" style={{ color: isRandom ? 'var(--accent-color)' : selectedColor }}>
                            This is what accented text looks like.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm font-bold text-muted uppercase tracking-widest">Gradients</p>
                        <div
                            className="w-full h-24 rounded-2xl accent-gradient-bg flex items-center justify-center text-white font-bold"
                            style={{ background: isRandom ? 'var(--accent-gradient)' : `linear-gradient(135deg, ${selectedColor} 0%, ${selectedColor}cc 100%)` }}
                        >
                            Accent Gradient
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeManager;
