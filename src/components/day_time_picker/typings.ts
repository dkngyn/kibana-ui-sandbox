/*
 * See SONAR_EULA file in the project root for full license information.
 */

export interface RecurDoc {
  dayOfWeek: number;
  hourOfDay: number[];
}

export interface Datum {
  day: string;
  hour: string;
  selected: boolean;
}
