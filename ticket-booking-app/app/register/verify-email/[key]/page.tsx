'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const { key } = useParams();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

const handleConfirm = async () => {
  if (!key) {
    setMessage('❌ No confirmation key found.');
    return;
  }

  setLoading(true);
  setMessage('🔄 Confirming your email...');

  try {
    const res = await fetch(`http://localhost:8000/api/v1/accounts/confirm-email/${key}/`);

    if (!res.ok) {
      const errorText = await res.text(); // don't try res.json() here
      throw new Error(errorText);
    }

    // Try parsing JSON only if you know it will be JSON
    setMessage('✅ Email verified successfully! You can now log in.');
    setConfirmed(true);
  } catch (error: any) {
    // Clean up the raw HTML if needed, or just show generic error
    setMessage(`❌ Verification failed: ${error.message.split('<')[0].trim()}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="text-xl font-semibold text-center">{message || 'Click the button below to confirm your email.'}</div>
      
      {!confirmed && (
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Confirming...' : 'Confirm Email'}
        </button>
      )}
    </div>
  );
}
