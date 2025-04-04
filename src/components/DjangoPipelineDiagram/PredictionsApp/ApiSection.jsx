// src/components/DjangoPipelineDiagram/PredictionsApp/ApiSection.jsx
import React from 'react';
import { colors, Tooltip, FileWithCode } from '../../DiagramComponents';

const ApiSection = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '160px'
        }}>
            <Tooltip content="API endpoints for predictions">
                <div style={{
                    backgroundColor: colors.field02,
                    color: colors.armyBlack,
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    borderRadius: '4px'
                }}>
                    api/
                </div>
            </Tooltip>

            <Tooltip content="API view controllers for prediction requests">
                <FileWithCode
                    name="views.py"
                    language="Python"
                    color={colors.field02}
                    textColor={colors.armyBlack}
                    code={`from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from ..models import PredictionResult, ModelVersion
from ..services.pipeline import TruckPredictionPipeline
from ..tasks import predict_trucks_for_movement
from .serializers import (
    PredictionInputSerializer,
    PredictionResultSerializer,
    ModelVersionSerializer
)
import logging

logger = logging.getLogger(__name__)

class PredictionViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['post'])
    def predict_trucks(self, request):
        # Validate input
        serializer = PredictionInputSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)
        
        movement_id = serializer.validated_data.get('movement_id')
        async_mode = serializer.validated_data.get('async_mode', False)
        
        # For async processing via Celery
        if async_mode:
            task = predict_trucks_for_movement.delay(movement_id)
            return Response({
                'status': 'accepted',
                'task_id': task.id
            }, status=status.HTTP_202_ACCEPTED)`}
                    marginLeft='10px'
                />
            </Tooltip>

            <Tooltip content="Data serializers for API requests and responses">
                <FileWithCode
                    name="serializers.py"
                    language="Python"
                    color={colors.field02}
                    textColor={colors.armyBlack}
                    code={`from rest_framework import serializers
from ..models import PredictionResult, ModelVersion

class PredictionInputSerializer(serializers.Serializer):
    movement_id = serializers.UUIDField()
    async_mode = serializers.BooleanField(default=False, required=False)
    
class PredictionResultSerializer(
    serializers.ModelSerializer
):
    movement_name = serializers.SerializerMethodField()
    features_used = serializers.JSONField()
    
    class Meta:
        model = PredictionResult
        fields = [
            'id', 'movement', 'movement_name', 
            'prediction_date', 'predicted_trucks', 
            'confidence_score', 'model_version', 
            'features_used'
        ]
        
    def get_movement_name(self, obj):
        return obj.movement.name if obj.movement else None`}
                    marginLeft='10px'
                />
            </Tooltip>

            <Tooltip content="Authentication and permissions for API access">
                <FileWithCode
                    name="permissions.py"
                    language="Python"
                    color={colors.field02}
                    textColor={colors.armyBlack}
                    code={`from rest_framework import permissions

class IsPredictionUser(permissions.BasePermission):
    """
    Custom permission to allow only users with prediction access
    """
    
    def has_permission(self, request, view):
        # Check if user has prediction access group
        return request.user.groups.filter(
            name='prediction_users'
        ).exists() or request.user.is_staff`}
                    marginLeft='10px'
                />
            </Tooltip>
        </div>
    );
};

export default ApiSection;