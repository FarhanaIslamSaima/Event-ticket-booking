# project/authentication/account_adapter.py

from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.authtoken.models import Token
from urllib.parse import urlencode
import logging

logger = logging.getLogger(__name__)

class CustomAccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation):
        key = emailconfirmation.key
        return f"{settings.FRONTEND_URL}/register/verify-email/{key}"
    
    def get_login_redirect_url(self, request):
        """
        Override to include the auth token in the redirect URL for social login
        """
        print("🟢 CustomAccountAdapter.get_login_redirect_url called")
        logger.debug("✅ Account adapter get_login_redirect_url called.")
        
        # Get or create token for the user
        token, created = Token.objects.get_or_create(user=request.user)
        print(f"Token created: {created}, Token key: {token.key}")
        
        # Build the redirect URL with token
        base_url = "http://localhost:3000"  # Replace with settings.FRONTEND_URL
        params = {
            'token': token.key,
            'user_id': request.user.id,
            'email': request.user.email,
        }
        
        redirect_url = f"{base_url}/auth/callback?{urlencode(params)}"
        print(f"✅ Account Adapter Redirect URL: {redirect_url}")
        return redirect_url

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    
    def get_login_redirect_url(self, request):
        print("🟡 CustomSocialAccountAdapter.get_login_redirect_url called")
        logger.debug("✅ Social account adapter get_login_redirect_url called.")
        
        # Get or create token for the user
        token, created = Token.objects.get_or_create(user=request.user)
        print(f"Token created: {created}, Token key: {token.key}")
        
        # Build the redirect URL with token
        base_url = "http://localhost:3000"  # Replace with settings.FRONTEND_URL
        params = {
            'token': token.key,
            'user_id': request.user.id,
            'email': request.user.email,
        }
        
        redirect_url = f"{base_url}/auth/callback?{urlencode(params)}"
        print(f"✅ Social Account Adapter Redirect URL: {redirect_url}")
        return redirect_url