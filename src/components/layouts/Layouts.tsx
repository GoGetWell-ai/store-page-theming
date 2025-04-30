// src/components/layouts/Layout.tsx
import React from 'react';
import MenuBar from '../shared/MenuBar'; // Make sure the path is correct

const Layout: React.FC = ({ children }) => {
    return (
        <div>
            <MenuBar /> {/* Make sure this is here */}
            <div>{children}</div> {/* This will render the Views content */}
        </div>
    );
};

export default Layout;
