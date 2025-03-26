import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Modal, message, Form } from 'antd';
import { useCourseModel } from '../models/useCourseModel';
import { Course } from '../types/Course';

const { Search } = Input;
const { Option } = Select;

const CourseList: React.FC = () => {
	const { courses, deleteExistingCourse, updateExistingCourse: updateCourse } = useCourseModel();
	const [coursesData, setCoursesData] = useState<Course[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState<string | null>(null);
	const [editingCourse, setEditingCourse] = useState<Course | null>(null);
	const [form] = Form.useForm();

	useEffect(() => {
		setCoursesData(courses);
	}, [courses]);

	const filteredCourses = coursesData.filter(
		(c: Course) =>
			c.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterStatus ? c.status === filterStatus : true),
	);

	const handleIncreaseStudentCount = (id: string, currentCount: number) => {
		const updatedCourse = { studentCount: currentCount + 1 };
		updateCourse(id, updatedCourse);
		message.success('Đã tăng số lượng học viên');
	};

	const handleDelete = (id: string) => {
		Modal.confirm({
			title: 'Bạn có chắc chắn muốn xóa khóa học?',
			content: 'Khóa học đã có học viên sẽ không thể xóa.',
			onOk: () => {
				if (deleteExistingCourse(id)) {
					message.success('Xóa thành công');
				} else {
					message.error('Không thể xóa khóa học đã có học viên.');
				}
			},
		});
	};

	const handleEdit = (course: Course) => {
		setEditingCourse(course);
		form.setFieldsValue(course);
	};

	const handleSave = () => {
		form.validateFields().then((values) => {
			if (editingCourse) {
				updateCourse(editingCourse.id, values);
				message.success('Cập nhật thành công');
				setEditingCourse(null);
			}
		});
	};

	return (
		<div>
			<Search placeholder='Tìm kiếm khóa học' onSearch={setSearchTerm} enterButton />
			<Select placeholder='Lọc theo trạng thái' onChange={setFilterStatus} allowClear>
				<Option value='Đang mở'>Đang mở</Option>
				<Option value='Đã kết thúc'>Đã kết thúc</Option>
				<Option value='Tạm dừng'>Tạm dừng</Option>
			</Select>

			<Table dataSource={filteredCourses} rowKey='id'>
				<Table.Column title='Tên khóa học' dataIndex='name' />
				<Table.Column title='Trạng thái' dataIndex='status' />
				<Table.Column
					title='Số lượng học viên'
					dataIndex='studentCount'
					sorter={(a: Course, b: Course) => a.studentCount - b.studentCount}
				/>
				<Table.Column
					title='Thao tác'
					render={(record: Course) => (
						<>
							<Button onClick={() => handleEdit(record)}>Sửa</Button>
							<Button danger onClick={() => handleDelete(record.id)}>
								Xóa
							</Button>
							<Button onClick={() => handleIncreaseStudentCount(record.id, record.studentCount)}>+1 Học viên</Button>
						</>
					)}
				/>
			</Table>

			<Modal
				title='Chỉnh sửa khóa học'
				visible={!!editingCourse}
				onCancel={() => setEditingCourse(null)}
				onOk={handleSave}
			>
				<Form form={form} layout='vertical'>
					<Form.Item
						name='name'
						label='Tên khóa học'
						rules={[{ required: true, message: 'Vui lòng nhập tên khóa học' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item name='status' label='Trạng thái' rules={[{ required: true }]}>
						<Select>
							<Option value='Đang mở'>Đang mở</Option>
							<Option value='Đã kết thúc'>Đã kết thúc</Option>
							<Option value='Tạm dừng'>Tạm dừng</Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default CourseList;
