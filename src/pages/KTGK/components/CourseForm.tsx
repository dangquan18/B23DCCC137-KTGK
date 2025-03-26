import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { useCourseModel } from '../models/useCourseModel';

const { Option } = Select;

const CourseForm: React.FC = () => {
	const { addNewCourse, updateExistingCourse: updateCourse } = useCourseModel();
	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editCourse, setEditCourse] = useState<any>(null);

	const showModal = (course?: any) => {
		if (course) {
			setEditCourse(course);
			form.setFieldsValue(course);
		} else {
			setEditCourse(null);
			form.resetFields();
		}
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		form.resetFields();
	};

	const handleSubmit = (values: any) => {
		if (editCourse) {
			updateCourse(editCourse.id, values);
			message.success('Cập nhật khóa học thành công!');
		} else {
			addNewCourse(values);
			message.success('Thêm khóa học thành công!');
		}
		setIsModalOpen(false);
		form.resetFields();
	};

	return (
		<>
			<Button type='primary' onClick={() => showModal()}>
				+ Thêm khóa học
			</Button>

			<Modal
				title={editCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'}
				visible={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
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
						{editCourse ? 'Cập nhật' : 'Thêm mới'}
					</Button>
				</Form>
			</Modal>
		</>
	);
};

export default CourseForm;
