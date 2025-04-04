from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import FocusTimerRecord
from .serializers import FocusTimerRecordSerializer


class FocusTimer(APIView):
    permission_classes = [IsAuthenticated]

    # def get(self, request):

    def post(self, request):
        time_value = request.data.get("newRecord")

        if not time_value:
            return Response({ "message": "A time value in milliseconds is required" }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            new_record = FocusTimerRecord.objects.create(
                user=request.user,
                duration=time_value
            )
        except Exception as e:
            return Response({ "message": f"An error occurred while creating the record: {str(e)}" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = FocusTimerRecordSerializer(new_record)
        return Response({ "message": "Record added successfully", "record": serializer.data }, status=status.HTTP_201_CREATED)