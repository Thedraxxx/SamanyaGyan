from .serializer import CustomUserSerializer
from django.contrib.auth import authenticate,login,logout

from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

# Create your views here.

class Login(APIView):
    def get(self,request):
        return Response({'message':'Loginplease'})

    def post(self,request,*args,**kwargs):
        try:
            username = request.data.get('username')
            password = request.data.get('password')

            if not username or not password:
                return Response({'messsage':"Please enter both username and password"},status=status.HTTP_400_BAD_REQUEST)

            user = authenticate(username=username,password=password)

            if user:
                login(user=user,request=request)
                refresh = RefreshToken.for_user(user)
                return Response({'message':True,'refresh':str(refresh),'access':str(refresh.access_token)},status=status.HTTP_200_OK)

            return Response({'message':'Invalid Credentials'},status=status.HTTP_401_UNAUTHORIZED)
        
        except Exception as e:
            return Response({'message':f'Unexpected error occured {str(e)}'},status=status.HTTP_417_EXPECTATION_FAILED)

class Register(APIView):

    def get(self,request):
        return Response({'message':'Register'})

    def post(self,request,*args,**kwargs):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            re_password = request.data.get('re_password')
            
            if password!=re_password:
                return Response({'message':'Please enter same password'})
            data={'username':username,'password':password}
            serializer = CustomUserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':True})
            
            return Response({'message':f'Error:{str(serializer.errors)}'})


        except Exception as e:
            return Response({'message':f'Unexpected Error Occured: {str(e)}'})

class Logout:
    def post(self,request):
        logout(request)
        return Response({'message':'Log out successfully'})