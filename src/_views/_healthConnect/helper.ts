import {RecordType} from 'react-native-health-connect';

export const getvailableRecordTypes = (): RecordType[] => {
  return [
    'BodyFat',
    'BloodPressure',
    'HeartRate',
    'Hydration',
    'Weight',
    'ActiveCaloriesBurned',
    'TotalCaloriesBurned',
    'BloodPressure',
    'BodyTemperature',
    'BoneMass',
    'ExerciseSession',
    'OxygenSaturation',
    'RespiratoryRate',
    'RestingHeartRate',
    'Steps',
    'Vo2Max',
    'Height',
    'Distance',
  ].sort((a, b) => (a > b ? -1 : 1)) as RecordType[];
};
