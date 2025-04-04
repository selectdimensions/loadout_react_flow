// src/components/DjangoPipelineDiagram/LoadoutApp.jsx
import React from 'react';
import { colors, Tooltip, FileWithCode, Badge } from '../DiagramComponents';

const LoadoutApp = ({ getSectionStyle, handleSectionHover, clearActiveSection }) => {
    return (
        <div
            style={{
                border: `2px solid ${colors.armyGold}`,
                borderRadius: '6px',
                width: '180px',
                height: '370px',
                backgroundColor: 'rgba(255, 204, 1, 0.1)',
                ...getSectionStyle('loadout')
            }}
            onMouseEnter={() => handleSectionHover('loadout')}
            onMouseLeave={clearActiveSection}
        >
            <Tooltip content="Core app handling movement operations, equipment loadout, and user interface">
                <div style={{
                    backgroundColor: colors.armyGold,
                    color: colors.armyBlack,
                    padding: '6px 10px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    loadout (App)
                    <Badge text="CORE" color={colors.armyBlack} backgroundColor={colors.white} />
                </div>
            </Tooltip>

            <div style={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                <Tooltip content="Database models for Movement, Equipment, Unit, and Cargo">
                    <FileWithCode
                        name="models.py"
                        language="Python"
                        color={colors.armyGold}
                        textColor={colors.armyBlack}
                        code={`class Movement(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    origin = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='origin_movements')
    destination = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='destination_movements')
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=MOVEMENT_STATUS, default='PLANNED')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='ROUTINE')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']`}
                    />
                </Tooltip>

                <Tooltip content="View controllers for handling HTTP requests and responses">
                    <FileWithCode
                        name="views.py"
                        language="Python"
                        color={colors.armyGold}
                        textColor={colors.armyBlack}
                        code={`class MovementViewSet(viewsets.ModelViewSet):
    queryset = Movement.objects.all()
    serializer_class = MovementSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['unit', 'status', 'priority']
    ordering_fields = ['start_date', 'created_at', 'updated_at']
    
    @action(detail=True, methods=['get'])
    def get_truck_prediction(self, request, pk=None):
        movement = self.get_object()
        prediction_service = PredictionService()
        result = prediction_service.predict_trucks(
            movement_id=movement.id
        )
        return Response(result)
        
    @action(detail=True, methods=['post'])
    def confirm_prediction(self, request, pk=None):
        movement = self.get_object()
        prediction_id = request.data.get('prediction_id')
        
        if not prediction_id:
            return Response(
                {'error': 'Prediction ID required'}, 
                status=400
            )
            
        try:
            prediction = PredictionResult.objects.get(id=prediction_id)
            movement.allocated_trucks = prediction.predicted_trucks
            movement.prediction_confirmed = True
            movement.save()
            return Response({'status': 'success'})
        except PredictionResult.DoesNotExist:
            return Response(
                {'error': 'Prediction not found'}, 
                status=404
            )`}
                    />
                </Tooltip>

                <Tooltip content="URL routing configuration for the loadout app">
                    <FileWithCode
                        name="urls.py"
                        language="Python"
                        color={colors.armyGold}
                        textColor={colors.armyBlack}
                        code={`from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('movements', views.MovementViewSet)
router.register('units', views.UnitViewSet)
router.register('equipment', views.EquipmentViewSet)
router.register('cargo', views.CargoItemViewSet)
router.register('locations', views.LocationViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('reports/', include('loadout.reports.urls')),
]`}
                    />
                </Tooltip>

                <Tooltip content="Admin interface configuration for data management">
                    <div style={{
                        backgroundColor: colors.armyGold,
                        color: colors.armyBlack,
                        padding: '6px 10px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        admin.py
                    </div>
                </Tooltip>

                <Tooltip content="Business logic services for movement operations">
                    <div style={{
                        backgroundColor: colors.armyGold,
                        color: colors.armyBlack,
                        padding: '6px 10px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        services/
                    </div>
                </Tooltip>

                <Tooltip content="Serializers for API data transformation">
                    <div style={{
                        backgroundColor: colors.armyGold,
                        color: colors.armyBlack,
                        padding: '6px 10px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        serializers.py
                    </div>
                </Tooltip>

                <Tooltip content="Custom middleware for request/response handling">
                    <div style={{
                        backgroundColor: colors.armyGold,
                        color: colors.armyBlack,
                        padding: '6px 10px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        middleware.py
                    </div>
                </Tooltip>
            </div>
        </div>
    );
};

export default LoadoutApp;