import React from 'react';
import { Layout, Typography, Divider } from 'antd';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';

const { Header, Content } = Layout;
const { Title } = Typography;

const CoursePage: React.FC = () => {
	return (
		<Layout style={{ minHeight: '100vh', padding: '20px' }}>
			<Header style={{ background: '#1890ff', color: '#fff', textAlign: 'center' }}>
				<Title level={2} style={{ color: '#fff', margin: 0 }}>
					Quản lý Khóa Học
				</Title>
			</Header>

			<Content
				style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '8px' }}
			>
				<Title level={3}>Thêm Khóa Học</Title>
				<CourseForm />

				<Divider />

				<Title level={3}>Danh Sách Khóa Học</Title>
				<CourseList />
			</Content>
		</Layout>
	);
};

export default CoursePage;
