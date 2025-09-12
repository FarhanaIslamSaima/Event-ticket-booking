import uuid
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from sslcommerz_lib import SSLCOMMERZ

from rest_framework.permissions import AllowAny
class InitiatePayment(APIView):
    """
    Start a payment and return the SSLCommerz gateway URL
    """
    permission_classes = [AllowAny] 
    def post(self, request):
        # 🔹 credentials from settings
        settings_dict = {
            'store_id': settings.SSLCZ_STORE_ID,
            'store_pass': settings.SSLCZ_STORE_PASS,
            'issandbox': settings.SSLCZ_IS_SANDBOX
        }

        sslcz = SSLCOMMERZ(settings_dict)

        # unique transaction id
        tran_id = str(uuid.uuid4())

        post_body = {
        'total_amount': request.data.get("amount", 1000),
        'currency': "BDT",
        'tran_id': tran_id,
        'success_url': "http://localhost:8000/api/payments/success/",
        'fail_url': "http://localhost:8000/api/payments/fail/",
        'cancel_url': "http://localhost:8000/api/payments/cancel/",
        'emi_option': 0,
        'cus_name': request.data.get("name", "Guest"),
        'cus_email': request.data.get("email", "guest@example.com"),
        'cus_phone': "01700000000",   # ✅ fixed default phone
        'cus_add1': "Dhaka",
        'cus_city': "Dhaka",
        'cus_country': "Bangladesh",
        'shipping_method': "NO",
        'product_name': "Test Product",
        'product_category': "Test Category",
        'product_profile': "general"
    }


        response = sslcz.createSession(post_body)

        return Response(response)


class PaymentSuccess(APIView):
    def post(self, request):
        return Response({"status": "success", "data": request.data})


class PaymentFail(APIView):
    def post(self, request):
        return Response({"status": "fail", "data": request.data})


class PaymentCancel(APIView):
    def post(self, request):
        return Response({"status": "cancelled", "data": request.data})
