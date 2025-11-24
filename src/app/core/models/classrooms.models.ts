export interface Classrooms {
  id?: number; 
  roomName: string;
  roomCode: string;
  capacity: number;
  roomType: string;
  location: string;
  hasProjector: boolean;
  hasAirConditioning: boolean;
  hasComputer: boolean;
  hasSoundSystem: boolean;
}

export interface ClassroomsResponse {
  count: number | null;
  data: Classrooms[];
  date: string;
  status: string;
  message: string[];
}