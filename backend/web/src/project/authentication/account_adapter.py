# project/authentication/account_adapter.py

from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings

class CustomAccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation):
        key = emailconfirmation.key
        return f"{settings.FRONTEND_URL}/register/verify-email/{key}"
