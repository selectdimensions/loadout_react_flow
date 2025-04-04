// src/components/DjangoPipelineDiagram/MetricsDisplay.jsx
import React from 'react';
import { colors, MetricsCard } from '../DiagramComponents';

const MetricsDisplay = () => {
    return (
        <MetricsCard
            title="System Performance"
            metrics={[
                { label: "Avg Response Time:", value: "247ms", valueColor: colors.success },
                { label: "Cache Hit Rate:", value: "86%", valueColor: colors.success },
                { label: "Prediction Accuracy:", value: "94.2%", valueColor: colors.success },
                { label: "Avg Daily Predictions:", value: "123", valueColor: "#000" },
                { label: "Uptime (30d):", value: "99.97%", valueColor: colors.success }
            ]}
            style={{
                position: 'absolute',
                bottom: '5px',
                left: '20px',
                width: '180px'
            }}
        />
    );
};

export default MetricsDisplay;