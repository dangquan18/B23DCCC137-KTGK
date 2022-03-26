import { Popconfirm, Button, Form } from 'antd';
import TableNguyenVong from './components/TableNguyenVong';
import { useModel } from 'umi';
import { ArrowLeftOutlined, CheckOutlined, SaveOutlined } from '@ant-design/icons';

const DangKyNguyenVong = () => {
  const { danhSachNguyenVong, setCurrent, putMyDanhSachNguyenVongModel, recordHoSo } =
    useModel('hosoxettuyen');
  return (
    <Form
      style={{ backgroundColor: '#fff', padding: 24 }}
      onFinish={() => {
        putMyDanhSachNguyenVongModel(recordHoSo?._id ?? '', { danhSachNguyenVong });
      }}
    >
      <TableNguyenVong />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 8 }}>
        <Popconfirm
          title={
            <>
              <p>Các thông tin vừa nhập sẽ bị mất nếu bạn chưa lưu.</p>
              <p>Bạn có muốn quay lại bước 2?</p>
            </>
          }
          okText="Có"
          cancelText="Không"
          onConfirm={() => {
            setCurrent(1);
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Bước 2/4
          </Button>
        </Popconfirm>
        <Button
          style={{ float: 'right', marginBottom: 8 }}
          type="primary"
          icon={<SaveOutlined />}
          htmlType="submit"
        >
          Lưu
        </Button>
        <Button
          disabled={danhSachNguyenVong.length === 0}
          type="primary"
          icon={<CheckOutlined />}
          onClick={() => {
            putMyDanhSachNguyenVongModel(recordHoSo?._id ?? '', { danhSachNguyenVong });
          }}
        >
          Bước 4/4
        </Button>
      </div>
      {/* </Spin> */}
    </Form>
  );
};

export default DangKyNguyenVong;
