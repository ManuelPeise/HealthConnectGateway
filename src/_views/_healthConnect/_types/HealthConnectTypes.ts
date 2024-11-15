import {RecordType} from 'react-native-health-connect';

export type HealthConnectPermission = {
  type: RecordType;
  read: boolean;
  write: boolean;
};
