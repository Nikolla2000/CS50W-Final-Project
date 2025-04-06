from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .serializers import FocusTimerRecordSerializer
from .models import FocusTimerRecord


class FocusTimerView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):     
        try:
              record = FocusTimerRecord.objects.filter(user=request.user).order_by("-duration").first()
              if not record:
                   return Response({ "message": "No records found", "data": None }, status=status.HTTP_200_OK)
              serializer = FocusTimerRecordSerializer(record)
              return Response({ "record": serializer.data }, status=status.HTTP_200_OK)
        except Exception as e:
              return Response({ "detail": str(e) }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
              

    def post(self, request):
            serializer = FocusTimerRecordSerializer(
                data=request.data,
                context={'request': request}
            )
            
            if not serializer.is_valid():
                return Response({ "status": "error", "message": "Validation failed", "errors": serializer.errors }, status=status.HTTP_400_BAD_REQUEST)

            try:
                serializer.save(user=request.user)
                return Response({ "status": "success", "message": "Record created", "data": serializer.data }, status=status.HTTP_201_CREATED )
            except Exception as e:
                return Response(
                    { "status": "error", "message": "Server error", "detail": str(e) }, status=status.HTTP_500_INTERNAL_SERVER_ERROR )