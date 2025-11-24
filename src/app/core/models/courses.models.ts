export interface Course {
  id?: number; 
  courseName: string;
  courseCode: string; 
  credits: number;
  semester: string;
  description: string;
}

export interface CourseResponse {
  count: number | null;
  data: Course[];
  date: string;
  status: string;
  message: string[];
}