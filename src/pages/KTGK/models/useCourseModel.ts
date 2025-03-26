import { useState, useEffect } from 'react';
import { Course } from '../types/Course';
import { getCourses, addCourse, updateCourse, deleteCourse } from '../services/courseService';

export const useCourseModel = () => {
	const [courses, setCourses] = useState<Course[]>([]);

	useEffect(() => {
		setCourses(getCourses());
	}, []);

	const addNewCourse = (course: Omit<Course, 'id' | 'studentCount'>) => {
		addCourse(course);
		setCourses(getCourses());
	};

	const updateExistingCourse = (id: string, updatedData: Partial<Course>) => {
		updateCourse(id, updatedData);
		setCourses(getCourses());
	};

	const deleteExistingCourse = (id: string): boolean => {
		if (!deleteCourse(id)) return false;
		setCourses(getCourses());
		return true;
	};

	return { courses, addNewCourse, updateExistingCourse, deleteExistingCourse };
};
