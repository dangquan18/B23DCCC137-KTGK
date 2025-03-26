import { Course } from '../types/Course';

const STORAGE_KEY = 'courses';

export const getCourses = (): Course[] => {
	const data = localStorage.getItem(STORAGE_KEY);
	return data ? JSON.parse(data) : [];
};

export const saveCourses = (courses: Course[]) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
};

export const addCourse = (course: Omit<Course, 'id' | 'studentCount'>) => {
	const courses = getCourses();
	const newCourse: Course = { id: crypto.randomUUID(), studentCount: 0, ...course };
	saveCourses([...courses, newCourse]);
};

export const updateCourse = (id: string, updatedData: Partial<Course>) => {
	const courses = getCourses().map((c) => (c.id === id ? { ...c, ...updatedData } : c));
	saveCourses(courses);
};

export const deleteCourse = (id: string): boolean => {
	const courses = getCourses();
	const course = courses.find((c) => c.id === id);
	if (!course || course.studentCount > 0) return false;

	saveCourses(courses.filter((c) => c.id !== id));
	return true;
};
