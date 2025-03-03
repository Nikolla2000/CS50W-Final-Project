import os
from dotenv import load_dotenv
from groq import Groq
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")

if groq_api_key is None:
    raise ValueError("API key not found in environment variables")

client = Groq(
    api_key=groq_api_key
)

class ChatWithProductino(APIView):
    def post(self, request):

        if not request.user.is_authenticated:
            return Response({ "message": "You must be signed in to use this feature" }, status=status.HTTP_401_UNAUTHORIZED)

        user_message = request.data.get("message")

        if not user_message:
            return Response({ "error": "No message provided" }, status=status.HTTP_400_BAD_REQUEST)

        conversation_history = request.session.get("conversation_history", [])

        conversation_history.append({ "role": "user", "content": user_message })

        try:
            chat_completion = client.chat.completions.create(
                messages=conversation_history + [
                    {
                        "role": "system",  
                        "content": "You are a helpful assistant",  
                    },
                ],
                model="llama-3.3-70b-versatile",
            )
            ai_response = chat_completion.choices[0].message.content
            conversation_history.append({ "role": "assistant", "content": ai_response })
            request.session['conversation_history'] = conversation_history
            session = request.session.get("conversation_history", [])

            return Response({ "message": ai_response }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({ "error": str(e) }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def get(self, request):
        conversation_history = request.session.get("conversation_history", [])

        return Response({ "conversation_history": conversation_history }, status=status.HTTP_200_OK)
