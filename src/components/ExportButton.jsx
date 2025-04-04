// src/components/ExportButton.jsx
import React from 'react';
import { colors } from './DiagramComponents';

const ExportButton = ({ onExport }) => {
  return (
    <button
      onClick={onExport}
      className="bg-white border border-gray-300 rounded-md p-2 shadow-sm hover:bg-gray-100 transition-all flex items-center gap-2"
      style={{
        position: 'absolute',
        top: '4rem',
        right: '1rem',
        zIndex: 10, // Ensure it is above other elements
        padding: '8px 12px',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontSize: '10px',
        color: colors.armyBlack
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      Export as SVG
    </button>
  );
};

export default ExportButton;