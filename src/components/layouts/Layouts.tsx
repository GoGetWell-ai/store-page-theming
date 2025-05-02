// src/components/layouts/Layout.tsx
import React from 'react'
import MenuBar from '../shared/MenuBar'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <MenuBar />
            <main className="flex-grow p-4"> {/* Add proper padding */}
                {children}
            </main>
            {/* Footer would go here if needed */}
        </div>
    )
}

export default Layout