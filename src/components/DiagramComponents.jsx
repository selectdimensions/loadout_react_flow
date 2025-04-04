// src/components/DiagramComponents.jsx
import React, { useState, useRef, useEffect } from 'react';

// Color palette for the diagram
export const colors = {
    armyBlack: '#221F20',
    armyGold: '#FFCC01',
    armyGreen: '#2F372F',
    tan: '#F1E4C7',
    white: '#FFFFFF',
    field01: '#565557',
    field02: '#B2B0B1',
    gray01: '#565557',
    gray02: '#97999B',
    success: '#00843D',
    alert: '#E57373',
    info: '#1976D2',
    lightBlue: '#D1E8F2'
};

// Tooltip component with improved styling and positioning
export const Tooltip = ({ children, content, width = 200 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const tooltipRef = useRef(null);
    const containerRef = useRef(null);

    const handleMouseEnter = (e) => {
        setIsVisible(true);
        calculatePosition(e);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    const handleMouseMove = (e) => {
        if (isVisible) {
            calculatePosition(e);
        }
    };

    const calculatePosition = (e) => {
        if (containerRef.current && tooltipRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            // Calculate initial position (follow cursor)
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top - tooltipRect.height - 10;

            // Make sure tooltip doesn't go off screen
            if (y < 0) {
                y = e.clientY - rect.top + 20; // Show below cursor if no room above
            }

            if (x + tooltipRect.width > window.innerWidth) {
                x = x - tooltipRect.width + 20; // Adjust to not go off right edge
            }

            setPosition({ x, y });
        }
    };

    return (
        <div
            ref={containerRef}
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            {children}
            {isVisible && (
                <div
                    ref={tooltipRef}
                    style={{
                        position: 'fixed',
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        zIndex: 1000,
                        maxWidth: `${width}px`,
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        pointerEvents: 'none',
                        transition: 'opacity 0.15s ease-in-out',
                    }}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

// Arrow component for drawing flow arrows
export const Arrow = ({
    from,
    to,
    color = colors.armyBlack,
    dashed = false,
    width = 2,
    arrowSize = 10,
    label = null
}) => {
    const [path, setPath] = useState('');
    const [mid, setMid] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Calculate path for arrow
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const midX = from.x + dx / 2;
        const midY = from.y + dy / 2;

        setMid({ x: midX, y: midY });
        setPath(`M ${from.x} ${from.y} L ${to.x} ${to.y}`);
    }, [from, to]);

    return (
        <>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <defs>
                    <marker
                        id={`arrowhead-${from.x}-${from.y}-${to.x}-${to.y}`}
                        markerWidth={arrowSize}
                        markerHeight={arrowSize * 0.7}
                        refX="0"
                        refY={arrowSize * 0.35}
                        orient="auto"
                    >
                        <polygon points={`0 0, ${arrowSize} ${arrowSize * 0.35}, 0 ${arrowSize * 0.7}`} fill={color} />
                    </marker>
                </defs>
                <path
                    d={path}
                    stroke={color}
                    strokeWidth={width}
                    strokeDasharray={dashed ? "5,5" : "none"}
                    fill="none"
                    markerEnd={`url(#arrowhead-${from.x}-${from.y}-${to.x}-${to.y})`}
                />
            </svg>
            {label && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${mid.x}px`,
                        top: `${mid.y - 10}px`,
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '2px 5px',
                        borderRadius: '3px',
                        fontSize: '10px',
                        pointerEvents: 'none',
                    }}
                >
                    {label}
                </div>
            )}
        </>
    );
};

// Component for displaying a file with code snippet
export const FileWithCode = ({
    name,
    language = "Python",
    color = colors.armyGold,
    textColor = colors.armyBlack,
    code = "",
    width = 'auto',
    marginLeft = '0px'
}) => {
    const [showCode, setShowCode] = useState(false);

    const toggleCode = (e) => {
        e.stopPropagation();
        setShowCode(!showCode);
    };

    return (
        <div
            style={{
                backgroundColor: color,
                color: textColor,
                padding: '6px 10px',
                fontSize: '12px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                position: 'relative',
                width: width,
                marginLeft: marginLeft,
                cursor: 'pointer'
            }}
            onClick={toggleCode}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span>{name}</span>
                <div style={{
                    fontSize: '9px',
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    padding: '2px 4px',
                    borderRadius: '3px',
                    marginLeft: '5px'
                }}>
                    {language}
                </div>
            </div>

            {showCode && (
                <div
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 5px)',
                        left: '0',
                        backgroundColor: '#282c34',
                        color: '#ABB2BF',
                        padding: '10px',
                        borderRadius: '4px',
                        width: '280px',
                        zIndex: 500,
                        fontSize: '10px',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        maxHeight: '300px',
                        overflowY: 'auto'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }} onClick={toggleCode}>
                        <span style={{ color: '#ABB2BF', fontSize: '12px' }}>×</span>
                    </div>
                    {code}
                </div>
            )}
        </div>
    );
};

// Badge component for labels and states
export const Badge = ({
    text,
    color = colors.white,
    backgroundColor = colors.success,
    size = 'small'
}) => {
    const fontSize = size === 'small' ? '9px' : '11px';
    const padding = size === 'small' ? '2px 5px' : '3px 8px';

    return (
        <span style={{
            display: 'inline-block',
            backgroundColor: backgroundColor,
            color: color,
            fontSize: fontSize,
            fontWeight: 'bold',
            padding: padding,
            borderRadius: '4px',
            marginLeft: '5px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
            {text}
        </span>
    );
};

// Info Panel component to show section details when hovering
export const InfoPanel = ({ section, className = '' }) => {
    // Define content for different sections
    const sections = {
        loadout: {
            title: 'Loadout App',
            description: 'Core app that handles movement operations, equipment tracking, and cargo management.',
            keyFiles: ['models.py', 'views.py', 'services/'],
            stats: [
                { label: 'API Endpoints', value: '12' },
                { label: 'Database Models', value: '8' },
                { label: 'Services', value: '5' }
            ]
        },
        predictions: {
            title: 'Predictions App',
            description: 'Specialized ML-powered application for predicting optimal truck quantities for military movements.',
            keyFiles: ['pipeline.py', 'model_predictor.py', 'data_transformer.py'],
            stats: [
                { label: 'Model Accuracy', value: '94.2%' },
                { label: 'Features Used', value: '14+' },
                { label: 'Avg Response Time', value: '247ms' }
            ]
        },
        external: {
            title: 'External Components',
            description: 'External services and components that support the prediction pipeline.',
            keyFiles: ['ML Models', 'PostgreSQL DB', 'Redis Cache', 'OSRM API'],
            stats: [
                { label: 'Cache Hit Rate', value: '86%' },
                { label: 'Database Size', value: '1.2GB' },
                { label: 'External API Calls', value: '1.2K/day' }
            ]
        }
    };

    const content = sections[section] || {
        title: section,
        description: 'No description available.',
        keyFiles: [],
        stats: []
    };

    return (
        <div className={`bg-white border border-gray-300 rounded-md shadow-md p-3 ${className}`} style={{ maxWidth: '280px' }}>
            <div className="text-sm font-bold mb-2">{content.title}</div>
            <div className="text-xs mb-3">{content.description}</div>

            {content.keyFiles.length > 0 && (
                <div className="mb-3">
                    <div className="text-xs font-semibold mb-1">Key Components:</div>
                    <div className="flex flex-wrap gap-1">
                        {content.keyFiles.map((file, index) => (
                            <span
                                key={index}
                                className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                            >
                                {file}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {content.stats.length > 0 && (
                <div>
                    <div className="text-xs font-semibold mb-1">Statistics:</div>
                    <div className="grid grid-cols-2 gap-1">
                        {content.stats.map((stat, index) => (
                            <div key={index} className="flex justify-between text-xs">
                                <span className="text-gray-600">{stat.label}:</span>
                                <span className="font-medium">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Metrics card component for displaying system metrics
export const MetricsCard = ({ title, metrics, style = {} }) => {
    return (
        <div style={{
            backgroundColor: 'rgba(255,255,255,0.8)',
            border: `1px solid ${colors.gray02}`,
            borderRadius: '4px',
            padding: '8px',
            fontSize: '10px',
            color: colors.armyBlack,
            ...style
        }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{title}</div>
            {metrics.map((metric, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{metric.label}</span>
                    <span style={{ color: metric.valueColor || 'inherit', fontWeight: metric.bold ? 'bold' : 'normal' }}>
                        {metric.value}
                    </span>
                </div>
            ))}
        </div>
    );
};