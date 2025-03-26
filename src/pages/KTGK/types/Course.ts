export type CourseStatus = 'Đang mở' | 'Đã kết thúc' | 'Tạm dừng';

export interface Course {
	id: string;
	name: string;
	instructorId: string;
	description: string;
	studentCount: number;
	status: CourseStatus;
}
