// src/components/DjangoPipelineDiagram/index.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { InfoPanel } from '../DiagramComponents';
import DiagramControls from './DiagramControls';
import MiniMap from './MiniMap';
import DjangoProjectContainer from './DjangoProjectContainer';
import ExportButton from '../ExportButton';

const DjangoPipelineDiagram = () => {
    const [viewportSize, setViewportSize] = useState({ width: 1000, height: 800 });
    const [activeSection, setActiveSection] = useState(null);
    const diagramRef = useRef(null);
    const diagramContentRef = useRef(null);

    // Adjust viewport size based on container
    useEffect(() => {
        const updateSize = () => {
            if (diagramRef.current) {
                const container = diagramRef.current.parentElement;
                setViewportSize({
                    width: container.clientWidth,
                    height: container.clientHeight
                });
            }
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleSectionHover = useCallback((section) => {
        setActiveSection(section);
    }, []);

    const clearActiveSection = useCallback(() => {
        setActiveSection(null);
    }, []);

    // Determine section highlight styling
    const getSectionStyle = useCallback((sectionName) => {
        const baseStyle = {};

        if (activeSection && activeSection !== sectionName) {
            baseStyle.opacity = 0.7;
            baseStyle.filter = 'grayscale(30%)';
            baseStyle.transition = 'all 0.3s ease';
        } else if (activeSection === sectionName) {
            baseStyle.boxShadow = '0 0 15px rgba(255, 204, 1, 0.6)';
            baseStyle.zIndex = 10;
            baseStyle.transition = 'all 0.3s ease';
        }

        return baseStyle;
    }, [activeSection]);

    const handleExportSVG = useCallback(() => {
        if (!diagramContentRef.current) return;

        try {
            // Clone the diagram content
            const contentElement = diagramContentRef.current;
            const clonedContent = contentElement.cloneNode(true);
            
            // Extract SVG elements and styling
            const svgElements = clonedContent.querySelectorAll('svg');
            const styles = document.querySelectorAll('style');
            
            // Create a new SVG document
            const svgNamespace = "http://www.w3.org/2000/svg";
            const newSvg = document.createElementNS(svgNamespace, "svg");
            newSvg.setAttribute("xmlns", svgNamespace);
            newSvg.setAttribute("width", contentElement.offsetWidth);
            newSvg.setAttribute("height", contentElement.offsetHeight);
            newSvg.setAttribute("viewBox", `0 0 ${contentElement.offsetWidth} ${contentElement.offsetHeight}`);
            
            // Create a style element for the SVG
            const styleElement = document.createElementNS(svgNamespace, "style");
            let cssText = '';
            styles.forEach(style => {
                cssText += style.textContent;
            });
            styleElement.textContent = cssText;
            newSvg.appendChild(styleElement);
            
            // Create a foreign object to hold the HTML content
            const foreignObject = document.createElementNS(svgNamespace, "foreignObject");
            foreignObject.setAttribute("width", "2000");
            foreignObject.setAttribute("height", "2000");
            foreignObject.innerHTML = contentElement.outerHTML;
            newSvg.appendChild(foreignObject);
            
            // Convert to SVG string
            const svgData = new XMLSerializer().serializeToString(newSvg);
            
            // Create a blob and download link
            const blob = new Blob([svgData], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            
            // Create download link and trigger click
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'django-pipeline-diagram.svg';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // Clean up
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting SVG:', error);
            alert('Failed to export SVG. See console for details.');
        }
    }, [diagramContentRef]);

    return (
        <div
            ref={diagramRef}
            className="diagram-container relative bg-white w-full h-full overflow-hidden border border-gray-200 rounded-lg shadow-sm"
            style={{ minHeight: '600px' }}
        >
            <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
                limitToBounds={false}
                minScale={0.1}
                maxScale={5} // Allow zooming in up to 5x
                wheelDisabled={false}
                centerOnInit={true}
                panning={{ velocityDisabled: false }}
            >
                {({ zoomIn, zoomOut, resetTransform, state }) => (
                    <>
                        <DiagramControls 
                            zoomIn={zoomIn} 
                            zoomOut={zoomOut} 
                            resetTransform={resetTransform} 
                        />

                        <ExportButton onExport={handleExportSVG} />
                        
                        <MiniMap state={state} />

                        {/* Information Panel - Shows when hovering sections */}
                        {activeSection && (
                            <InfoPanel
                                section={activeSection}
                                className="absolute bottom-4 left-4 z-10"
                            />
                        )}

                        <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                            <div 
                            ref={diagramContentRef}  // Add this line
                            style={{
                                padding: '20px',
                                fontFamily: 'Arial, sans-serif',
                                width: '1000px',
                                height: '800px',
                                position: 'relative',
                                overflow: 'visible',
                                backgroundColor: '#ffffff'
                            }}>
                                <h2 style={{
                                    color: '#221F20',
                                    margin: '0 0 15px 0',
                                    textAlign: 'center',
                                    fontSize: '32px'
                                }}>
                                    Django Cost Prediction Pipeline Integration
                                </h2>

                                <div style={{
                                    fontSize: '14px',
                                    color: '#221F20',
                                    textAlign: 'center',
                                    marginBottom: '15px',
                                    maxWidth: '800px',
                                    margin: '0 auto 20px'
                                }}>
                                    End-to-end pipeline for predicting cost needed for military movement operations
                                </div>
                                
                                <DjangoProjectContainer 
                                    activeSection={activeSection}
                                    handleSectionHover={handleSectionHover}
                                    clearActiveSection={clearActiveSection}
                                    getSectionStyle={getSectionStyle}
                                />
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    );
};

export default DjangoPipelineDiagram;