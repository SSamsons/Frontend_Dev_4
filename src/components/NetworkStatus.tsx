import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setNotificationMessage('Connection restored');
      setShowNotification(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setNotificationMessage('You are offline');
      setShowNotification(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <Snackbar
      open={showNotification}
      autoHideDuration={6000}
      onClose={handleCloseNotification}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleCloseNotification}
        severity={isOnline ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {notificationMessage}
      </Alert>
    </Snackbar>
  );
};

export default NetworkStatus; 