import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useCourseModel } from '../models/useCourseModel';

const { Option } = Select;

const CourseForm: React.FC = () => {
	const { addNewCourse } = useCourseModel();
	const [form] = Form.useForm();

	const handleSubmit = (values: any) => {
		addNewCourse(values);
		message.success('Thêm khóa học thành công!');
		form.resetFields();
	};

	return (
		<Form form={form} layout='vertical' onFinish={handleSubmit}>
			<Form.Item name='name' label='Tên khóa học' rules={[{ required: true, message: 'Nhập tên khóa học' }]}>
				<Input maxLength={100} />
			</Form.Item>

			<Form.Item name='instructorId' label='Giảng viên' rules={[{ required: true, message: 'Chọn giảng viên' }]}>
				<Select>
					<Option value='1'>John Doe</Option>
					<Option value='2'>Jane Smith</Option>
				</Select>
			</Form.Item>

			<Form.Item name='description' label='Mô tả khóa học'>
				<Input.TextArea />
			</Form.Item>

			<Form.Item name='status' label='Trạng thái' rules={[{ required: true, message: 'Chọn trạng thái' }]}>
				<Select>
					<Option value='Đang mở'>Đang mở</Option>
					<Option value='Đã kết thúc'>Đã kết thúc</Option>
					<Option value='Tạm dừng'>Tạm dừng</Option>
				</Select>
			</Form.Item>

			<Button type='primary' htmlType='submit'>
				Thêm khóa học
			</Button>
		</Form>
	);
};

export default CourseForm;
