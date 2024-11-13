import React from 'react';
import {
  initialize,
  requestPermission,
  readRecords,
  getGrantedPermissions,
  getSdkStatus,
  Permission,
  ReadRecordsResult,
  //   revokeAllPermissions,
} from 'react-native-health-connect';

export const useHealthConnect = () => {
  const [status, setStatus] = React.useState<number>(-1);
  const [initialized, setInitialized] = React.useState<boolean>(false);
  const [perm, setPerm] = React.useState<Permission[]>([]);
  const [steps, setSteps] = React.useState<ReadRecordsResult<'Steps'> | null>(
    null,
  );
  const init = React.useCallback(async () => {
    const isInitialized = await initialize();

    console.log('is init:', isInitialized);
    setInitialized(isInitialized);
  }, []);

  const isAvailable = React.useCallback(async () => {
    const res = await getSdkStatus();

    console.log('Response', res);
    setStatus(res);
    if (res === 1) {
      return {status: false, message: 'SDK unavailable'};
    } else if (res === 2) {
      return {status: false, message: 'SDK update required'};
    } else if (res === 3) {
      return {status: true, message: 'Health Connect available'};
    }
  }, []);

  const getPermission = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      requestPermission([
        {accessType: 'read', recordType: 'TotalCaloriesBurned'},
        {accessType: 'write', recordType: 'TotalCaloriesBurned'},
        {accessType: 'read', recordType: 'Steps'},
        {accessType: 'read', recordType: 'HeartRate'},
        {accessType: 'read', recordType: 'Distance'},
        {accessType: 'read', recordType: 'SleepSession'},
      ])
        .then(permissions => {
          console.log('Requested permissions:', permissions);
          setPerm(permissions);
          resolve(permissions.length > 0);
        })
        .catch(e => {
          reject(Error(e.message));
          console.log('Requested permissions:', e.message);
        });
    });
  }, []);

  const readSteps = React.useCallback(async () => {
    try {
      const result = await readRecords('Steps', {
        timeRangeFilter: {
          operator: 'between',
          startTime: new Date(2024, 1, 1).toISOString(),
          endTime: new Date(2024, 11, 1).toISOString(),
        },
      });

      setSteps(result);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getGranted = React.useCallback(async () => {
    const result = await getGrantedPermissions();

    console.log('Granted: ', result);
  }, []);
  return {
    status: status,
    isInitialized: initialized,
    permissions: perm,
    steps: steps,
    initialize: init,
    isAvailable: isAvailable,
    requestPermissions: getPermission,
    readSteps: readSteps,
    getGranted: getGranted,
  };
};
