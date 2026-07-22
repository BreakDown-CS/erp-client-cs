import { StaffList } from "@/modules/employees/emp.type";
import { EditOutlined } from "@ant-design/icons";
import { Button, TableColumnsType, Tooltip } from "antd";

export const StaffListColumns = (handleEditStaff: (staffId: string) => void): TableColumnsType<StaffList> => [
    {
        title: 'ลำดับ',
        dataIndex: 'index',
        key: 'index',
        fixed: 'left',
        align: 'center',
        render: (_text, _record, index) => (
            <span style={{ textAlign: 'center', display: 'block' }}>
                {index + 1}
            </span>
        )
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
        dataIndex: 'full_name',
        key: 'id',
        align: 'center',
        render: (_text: string, record: StaffList) => (
            <span style={{ whiteSpace: 'nowrap' }}>{record.full_name || '-'}</span>
        ),
    },
    {
        title: 'ชื่อเล่น',
        dataIndex: 'nick_name',
        key: 'nick_name',
        align: 'center',
        render: (_text: string, record: StaffList) => (
            <span style={{ whiteSpace: 'nowrap' }}>{record.nick_name || '-'}</span>
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
            <Tooltip title={text || '-'}>
                <div style={{ maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0 auto' }}>
                    {text || '-'}
                </div>
            </Tooltip>
        ),
    },
    {
        title: 'แผนก',
        dataIndex: 'department_name',
        key: 'department_name',
        align: 'center',
        render: (text: string) => (
            <Tooltip title={text || '-'}>
                <div style={{ maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0 auto' }}>
                    {text || '-'}
                </div>
            </Tooltip>
        ),
    },
    {
        title: 'ตำแหน่ง',
        dataIndex: 'position_name',
        key: 'position_name',
        align: 'center',
        render: (text: string) => (
            <Tooltip title={text || '-'}>
                <div style={{ maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0 auto' }}>
                    {text || '-'}
                </div>
            </Tooltip>
        ),
    },
    {
        title: 'สถานะ',
        dataIndex: 'employee_status',
        key: 'employee_status',
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
                        icon={<EditOutlined />}
                        onClick={() =>
                            handleEditStaff(record.employee_id)
                        }
                    />
                </Tooltip>
            </div>
        ),
    }
]