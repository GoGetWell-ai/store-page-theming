import React from 'react';
import { useThemeStore } from '@/store/themeStore';

const Themes: React.FC = () => {
    const { setSpecialty } = useThemeStore();

    const handleThemeChange = (theme: string) => {
        setSpecialty(theme as any);
    };

    return (
        <div className="flex flex-col items-center p-5">
            <h2 className="text-3xl mb-4">Choose Your Theme</h2>
            <div className="space-x-4">
                <button
                    onClick={() => handleThemeChange('default')}
                    className="px-4 py-2 border rounded bg-blue-500 text-white"
                >
                    Default Theme
                </button>
                <button
                    onClick={() => handleThemeChange('theme1')}
                    className="px-4 py-2 border rounded bg-green-500 text-white"
                >
                    Organ Transplant Theme
                </button>
                <button
                    onClick={() => handleThemeChange('theme2')}
                    className="px-4 py-2 border rounded bg-red-500 text-white"
                >
                    Cosmetic Surgery Theme
                </button>
            </div>
        </div>
    );
};

export default Themes;
