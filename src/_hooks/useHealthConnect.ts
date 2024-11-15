import React from 'react';
import {
  initialize,
  requestPermission,
  readRecords,
  getGrantedPermissions,
  getSdkStatus,
  Permission,
  ReadRecordsResult,
} from 'react-native-health-connect';
// import {HealthConnectPermission} from '../_views/_healthConnect/_types/HealthConnectTypes';

export const useHealthConnect = () => {
  // TODO build Models
  // const [permissionModels, setPermissionModels] = React.useState<
  //   HealthConnectPermission[]
  // >([]);

  const [initialized, setInitialized] = React.useState<boolean>(false);
  const [grantedPermissions, setGrantedPermissions] = React.useState<
    Permission[]
  >([]);

  const [perm, setPerm] = React.useState<Permission[]>([]);
  const [steps, setSteps] = React.useState<ReadRecordsResult<'Steps'> | null>(
    null,
  );

  // initialize
  React.useEffect(() => {
    const onLoad = async () => {
      setInitialized(await initialize());
    };

    onLoad();
  }, []);

  React.useEffect(() => {
    const onLoad = async () => {
      if (initialized) {
        setGrantedPermissions(await getGrantedPermissions());
      }
    };

    onLoad();
  }, [initialized]);

  const isAvailable = React.useCallback(async () => {
    return await getSdkStatus();
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
    return await getGrantedPermissions();
  }, []);

  return {
    isInitialized: initialized,
    grantedPermissions: grantedPermissions,
    permissions: perm,
    steps: steps,
    isAvailable: isAvailable,
    requestPermissions: getPermission,
    readSteps: readSteps,
    getGranted: getGranted,
  };
};
