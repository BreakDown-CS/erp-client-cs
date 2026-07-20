import { StaffList } from "@/modules/employees/emp.type";
import { EditOutlined } from "@ant-design/icons";
import { Button, TableColumnsType, Tooltip } from "antd";

export const StaffListColumns = (handleEditStaff: (staffId: string) => void): TableColumnsType<StaffList> => [
    {
        title: 'ลำดับ',
        dataIndex: 'id',
        key: 'id',
        fixed: 'left',
        align: 'center',
        render: (index: number) => {
            console.log(index)
            return (
                <span style={{ textAlign: 'center', display: 'block' }}>
                    {index}
                </span>
            )
        }
    },
    {
        title: 'EM-CODE',
        dataIndex: 'employee_code',
        key: 'employee_code',
        align: 'center',
        render: (text: string) => (
            <span style={{ whiteSpace: 'nowrap' }}>{text || '-'}</span>
        ),
    },
    {
        title: 'ชื่อพนักงาน',
        dataIndex: 'first_name',
        key: 'id',
        align: 'center',
        render: (_text: string, record: StaffList) => (
            <span style={{ whiteSpace: 'nowrap' }}>{record.first_name + ' ' + record.last_name || '-'}</span>
        ),
    },
    {
        title: 'รหัสพนักงาน',
        dataIndex: 'username',
        key: 'username',
        align: 'center',
        render: (text: string) => (
            <span style={{ whiteSpace: 'nowrap' }}>{text || '-'}</span>
        ),
    },
    {
        title: 'สาขา',
        dataIndex: 'branch_name',
        key: 'branch_name',
        align: 'center',
        render: (text: string) => (
            <span style={{ whiteSpace: 'nowrap' }}>{text || '-'}</span>
        ),
    },
    {
        title: 'แผนก',
        dataIndex: 'department_name',
        key: 'department_name',
        align: 'center',
        render: (text: string) => (
            <span style={{ whiteSpace: 'nowrap' }}>{text || '-'}</span>
        ),
    },

    {
        title: 'ตำแหน่ง',
        dataIndex: 'position_name',
        key: 'position_name',
        align: 'center',
        render: (text: string) => (
            <span style={{ whiteSpace: 'nowrap' }}>{text || '-'}</span>
        ),
    },

    {
        title: 'สถานะ',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (text: string) => (
            <span style={{ whiteSpace: 'nowrap' }}>{text || '-'}</span>
        ),
    },
    {
        title: 'เครื่องมือ',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        render: (_text, record) => (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Tooltip title="แก้ไข">
                    <Button
                        type="primary"
                        size="middle"
                        style={{
                            backgroundColor: '#e9a40e',
                            borderColor: '#e9a40e',
                            color: '#fff',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                            transition: 'all 0.3s ease',
                        }}
                        icon={<EditOutlined/>}
                        onClick={() =>
                            handleEditStaff(record.id)
                        }
                    />
                </Tooltip>
            </div>
        ),
    }
]