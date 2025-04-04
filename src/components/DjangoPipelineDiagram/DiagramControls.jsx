// src/components/DjangoPipelineDiagram/DiagramControls.jsx
import React from 'react';

const DiagramControls = ({ zoomIn, zoomOut, resetTransform }) => {
    return (
        <div className="diagram-controls absolute top-4 right-4 z-10 flex gap-2">
            <button
                onClick={() => zoomIn()}
                className="bg-white border border-gray-300 rounded-md p-2 shadow-sm hover:bg-gray-100 transition-all"
                aria-label="Zoom in"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
            <button
                onClick={() => zoomOut()}
                className="bg-white border border-gray-300 rounded-md p-2 shadow-sm hover:bg-gray-100 transition-all"
                aria-label="Zoom out"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                </svg>
            </button>
            <button
                onClick={() => resetTransform()}
                className="bg-white border border-gray-300 rounded-md p-2 shadow-sm hover:bg-gray-100 transition-all"
                aria-label="Reset zoom"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
            </button>
        </div>
    );
};

export default DiagramControls;