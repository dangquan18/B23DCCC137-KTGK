import React, { useState } from 'react';
import { Table, Input, Select, Button, Modal, message } from 'antd';
import { useCourseModel } from '../models/useCourseModel';
import { Course } from '../types/Course';

const { Search } = Input;
const { Option } = Select;

const CourseList: React.FC = () => {
	const { courses, deleteExistingCourse } = useCourseModel();
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState<string | null>(null);

	const filteredCourses = courses.filter(
		(c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterStatus ? c.status === filterStatus : true),
	);

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
				<Table.Column
					title='Số lượng học viên'
					dataIndex='studentCount'
					sorter={(a, b) => a.studentCount - b.studentCount}
				/>
				<Table.Column
					title='Thao tác'
					render={(record: Course) => (
						<Button danger onClick={() => handleDelete(record.id)}>
							Xóa
						</Button>
					)}
				/>
			</Table>
		</div>
	);
};

export default CourseList;
