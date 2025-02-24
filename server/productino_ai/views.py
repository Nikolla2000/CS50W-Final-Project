from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class ChatWithProductino(APIView):
  def post(self, request):
    return Response({ "message": "test" })
