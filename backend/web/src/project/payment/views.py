import uuid
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from sslcommerz_lib import SSLCOMMERZ
from project.event.models import Order
from rest_framework.permissions import AllowAny
from django.shortcuts import redirect

class InitiatePayment(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # 🔹 credentials from settings
        settings_dict = {
            'store_id': settings.SSLCZ_STORE_ID,
            'store_pass': settings.SSLCZ_STORE_PASS,
            'issandbox':  settings.SSLCZ_IS_SANDBOX
        }

        sslcz = SSLCOMMERZ(settings_dict)
        id = request.data.get("id")
        print(id)
        
        

             # 🔹 Check if an unpaid order already exists
        order = Order.objects.get(
            id=id,

            # assume default is due
        )
       
       
      
       

        post_body = {
            'total_amount': 10,
            'currency': "BDT",
            'tran_id': str(order.tran_id),  # use Order tran_id
            'success_url': f"http://localhost:8000/api/v1/payment/success/{order.tran_id}/",
            'fail_url': f"http://localhost:8000/api/v1/payment/fail/{order.tran_id}/",
            'cancel_url': f"http://localhost:8000/api/v1/payment/cancel/{order.tran_id}/",
            'emi_option': 0,
            'cus_name': request.data.get("name", "Guest"),
            'cus_email': request.data.get("email", "guest@example.com"),
            "cus_phone": "0000000000",
            'cus_add1': "Dhaka",
            'cus_city': "Dhaka",
            'cus_country': "Bangladesh",
            'shipping_method': "NO",
            'product_name': "Event Tickets",
            'product_category': "Tickets",
            'product_profile': "general"
        }

        response = sslcz.createSession(post_body)
        print(response)

        return Response({
            "gateway_url": response.get("GatewayPageURL"),
            "tran_id": order.tran_id
            
        })

class PaymentSuccess(APIView):
    permission_classes = [AllowAny]

    def post(self, request, tran_id=None):
        """
        If frontend posts tran_id in body, use that.
        Or if using URL param (recommended), use tran_id from URL.
        """

        tran_id = tran_id or request.data.get("tran_id")
        if not tran_id:
            return Response({"status": "error", "message": "Transaction ID missing"}, status=400)

        try:
            order = Order.objects.get(tran_id=tran_id)
            order.status = "paid"
            order.save()
            # Redirect frontend after updating DB
            print(order.status)

            return redirect(f"http://localhost:3000/payment/payment-success?tran_id={tran_id}")
        except Order.DoesNotExist:
            return Response({"status": "error", "message": "Order not found"}, status=404)


class PaymentFail(APIView):
    def post(self, request):
        return Response({"status": "fail", "data": request.data})


class PaymentCancel(APIView):
    def post(self, request):
        return Response({"status": "cancelled", "data": request.data})
