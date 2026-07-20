## branches

CREATE TABLE branches (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    branch_code VARCHAR(20) NOT NULL,
    branch_name_th VARCHAR(255) NOT NULL,
    branch_name_en VARCHAR(255),
    phone VARCHAR(30),
    email VARCHAR(255),
    address TEXT,
    is_head_office BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by BIGINT,
    deleted_at TIMESTAMPTZ,
    deleted_by BIGINT,
    version INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT pk_branches
        PRIMARY KEY (id),
    CONSTRAINT uq_branches_uuid
        UNIQUE (uuid),
    CONSTRAINT uq_branches_code
        UNIQUE (branch_code),
    CONSTRAINT uq_branches_email
        UNIQUE (email),
    CONSTRAINT chk_branches_code
        CHECK (length(trim(branch_code)) > 0)
);

COMMENT ON TABLE branches
IS 'Company Branch Master';

COMMENT ON COLUMN branches.branch_code
IS 'Unique business branch code';

COMMENT ON COLUMN branches.branch_name_th
IS 'Branch name (Thai)';

COMMENT ON COLUMN branches.branch_name_en
IS 'Branch name (English)';

COMMENT ON COLUMN branches.is_head_office
IS 'Head Office Flag';

COMMENT ON COLUMN branches.is_active
IS 'Record Active Flag';

## departments

CREATE TABLE departments (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    department_code VARCHAR(20) NOT NULL,
    department_name_th VARCHAR(255) NOT NULL,
    department_name_en VARCHAR(255),
    branch_id BIGINT NOT NULL,
    parent_department_id BIGINT,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by BIGINT,
    deleted_at TIMESTAMPTZ,
    deleted_by BIGINT,
    version INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT pk_departments
        PRIMARY KEY (id),
    CONSTRAINT uq_departments_uuid
        UNIQUE (uuid),
    CONSTRAINT uq_departments_code
        UNIQUE (department_code),
    CONSTRAINT chk_departments_code
        CHECK (length(trim(department_code)) > 0)
);

ALTER TABLE departments
ADD CONSTRAINT fk_departments_branch
FOREIGN KEY (branch_id)
REFERENCES branches(id)
ON UPDATE RESTRICT
ON DELETE RESTRICT;

ALTER TABLE departments
ADD CONSTRAINT fk_departments_parent
FOREIGN KEY (parent_department_id)
REFERENCES departments(id)
ON UPDATE RESTRICT
ON DELETE RESTRICT;

COMMENT ON TABLE departments
IS 'Department Master';

COMMENT ON COLUMN departments.department_code
IS 'Unique Department Code';

COMMENT ON COLUMN departments.branch_id
IS 'Reference Branch';

COMMENT ON COLUMN departments.parent_department_id
IS 'Parent Department';

COMMENT ON COLUMN departments.sort_order
IS 'Display Order';

CREATE INDEX idx_departments_code
ON departments(department_code);

CREATE INDEX idx_departments_branch
ON departments(branch_id);

CREATE INDEX idx_departments_parent
ON departments(parent_department_id);

CREATE INDEX idx_departments_active
ON departments(is_active);

CREATE INDEX idx_departments_deleted
ON departments(deleted_at);

## positions

CREATE TABLE positions (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    position_code VARCHAR(20) NOT NULL,
    position_name_th VARCHAR(255) NOT NULL,
    position_name_en VARCHAR(255),
    department_id BIGINT NOT NULL,
    position_level SMALLINT NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by BIGINT,
    deleted_at TIMESTAMPTZ,
    deleted_by BIGINT,
    version INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT pk_positions
        PRIMARY KEY (id),
    CONSTRAINT uq_positions_uuid
        UNIQUE (uuid),
    CONSTRAINT uq_positions_code
        UNIQUE (position_code),
    CONSTRAINT chk_positions_code
        CHECK (length(trim(position_code)) > 0),
    CONSTRAINT chk_positions_level
        CHECK (position_level > 0)
);

ALTER TABLE positions
ADD CONSTRAINT fk_positions_department
FOREIGN KEY (department_id)
REFERENCES departments(id)
ON UPDATE RESTRICT
ON DELETE RESTRICT;

COMMENT ON TABLE positions
IS 'Position Master';

COMMENT ON COLUMN positions.position_code
IS 'Unique Position Code';

COMMENT ON COLUMN positions.department_id
IS 'Reference Department';

COMMENT ON COLUMN positions.position_level
IS 'Position Level';

COMMENT ON COLUMN positions.sort_order
IS 'Display Order';

CREATE INDEX idx_positions_code
ON positions(position_code);

CREATE INDEX idx_positions_department
ON positions(department_id);

CREATE INDEX idx_positions_level
ON positions(position_level);

CREATE INDEX idx_positions_active
ON positions(is_active);

CREATE INDEX idx_positions_deleted
ON positions(deleted_at);

## employee_statuses

CREATE TABLE employee_statuses (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    status_code VARCHAR(30) NOT NULL,
    status_name_th VARCHAR(100) NOT NULL,
    status_name_en VARCHAR(100),
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by BIGINT,
    deleted_at TIMESTAMPTZ,
    deleted_by BIGINT,
    version INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT pk_employee_statuses
        PRIMARY KEY (id),
    CONSTRAINT uq_employee_statuses_uuid
        UNIQUE (uuid),
    CONSTRAINT uq_employee_statuses_code
        UNIQUE (status_code),
    CONSTRAINT chk_employee_statuses_code
        CHECK (length(trim(status_code)) > 0)
);

COMMENT ON TABLE employee_statuses
IS 'Employee Status Master';

COMMENT ON COLUMN employee_statuses.status_code
IS 'Unique Employee Status Code';

COMMENT ON COLUMN employee_statuses.status_name_th
IS 'Employee Status Name (Thai)';

COMMENT ON COLUMN employee_statuses.status_name_en
IS 'Employee Status Name (English)';

COMMENT ON COLUMN employee_statuses.sort_order
IS 'Display Order';

CREATE INDEX idx_employee_statuses_code
ON employee_statuses(status_code);

CREATE INDEX idx_employee_statuses_active
ON employee_statuses(is_active);

CREATE INDEX idx_employee_statuses_deleted
ON employee_statuses(deleted_at);


## employees

CREATE TABLE employees (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    employee_code VARCHAR(30) NOT NULL,
    first_name_th VARCHAR(100) NOT NULL,
    last_name_th VARCHAR(100) NOT NULL,
    first_name_en VARCHAR(100),
    last_name_en VARCHAR(100),
    nickname VARCHAR(100),
    gender VARCHAR(20) NOT NULL,
    birth_date DATE,
    email VARCHAR(255),
    phone VARCHAR(30),
    branch_id BIGINT NOT NULL,
    department_id BIGINT NOT NULL,
    position_id BIGINT NOT NULL,
    status_id BIGINT NOT NULL,
    hire_date DATE NOT NULL,
    terminated_at DATE,
    remark TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by BIGINT,
    deleted_at TIMESTAMPTZ,
    deleted_by BIGINT,
    version INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT pk_employees
        PRIMARY KEY (id),
    CONSTRAINT uq_employees_uuid
        UNIQUE (uuid),
    CONSTRAINT uq_employees_code
        UNIQUE (employee_code),
    CONSTRAINT uq_employees_email
        UNIQUE (email),
    CONSTRAINT chk_employees_code
        CHECK (length(trim(employee_code)) > 0),
    CONSTRAINT chk_employees_gender
        CHECK (gender IN ('MALE','FEMALE','OTHER')),
    CONSTRAINT fk_employees_branch
        FOREIGN KEY (branch_id)
        REFERENCES branches(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT fk_employees_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT fk_employees_position
        FOREIGN KEY (position_id)
        REFERENCES positions(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT fk_employees_status
        FOREIGN KEY (status_id)
        REFERENCES employee_statuses(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

COMMENT ON TABLE employees
IS 'Employee Master';

COMMENT ON COLUMN employees.employee_code
IS 'Unique Employee Code';

COMMENT ON COLUMN employees.branch_id
IS 'Reference Branch';

COMMENT ON COLUMN employees.department_id
IS 'Reference Department';

COMMENT ON COLUMN employees.position_id
IS 'Reference Position';

COMMENT ON COLUMN employees.status_id
IS 'Reference Employee Status';

CREATE INDEX idx_employees_code
ON employees(employee_code);

CREATE INDEX idx_employees_branch
ON employees(branch_id);

CREATE INDEX idx_employees_department
ON employees(department_id);

CREATE INDEX idx_employees_position
ON employees(position_id);

CREATE INDEX idx_employees_status
ON employees(status_id);

CREATE INDEX idx_employees_email
ON employees(email);

CREATE INDEX idx_employees_phone
ON employees(phone);

CREATE INDEX idx_employees_active
ON employees(is_active);

CREATE INDEX idx_employees_deleted
ON employees(deleted_at);

CREATE INDEX idx_employees_created_at
ON employees(created_at);

## users

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    employee_id BIGINT NOT NULL,
    username VARCHAR(100) NOT NULL,
    password_hash TEXT NOT NULL,
    last_login_at TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by BIGINT,
    deleted_at TIMESTAMPTZ,
    deleted_by BIGINT,
    version INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT pk_users
        PRIMARY KEY (id),
    CONSTRAINT uq_users_uuid
        UNIQUE (uuid),
    CONSTRAINT uq_users_username
        UNIQUE (username),
    CONSTRAINT uq_users_employee
        UNIQUE (employee_id),
    CONSTRAINT chk_users_username
        CHECK (length(trim(username)) > 0),
    CONSTRAINT fk_users_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

COMMENT ON TABLE users
IS 'System User Account';

COMMENT ON COLUMN users.employee_id
IS 'Reference Employee';

COMMENT ON COLUMN users.username
IS 'Login Username';

COMMENT ON COLUMN users.password_hash
IS 'Password Hash';

CREATE INDEX idx_users_username
ON users(username);

CREATE INDEX idx_users_employee
ON users(employee_id);

CREATE INDEX idx_users_active
ON users(is_active);

CREATE INDEX idx_users_deleted
ON users(deleted_at);

## roles

CREATE TABLE roles (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    role_code VARCHAR(50) NOT NULL,
    role_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_system BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by BIGINT,
    deleted_at TIMESTAMPTZ,
    deleted_by BIGINT,
    version INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT pk_roles
        PRIMARY KEY (id),
    CONSTRAINT uq_roles_uuid
        UNIQUE (uuid),
    CONSTRAINT uq_roles_code
        UNIQUE (role_code),
    CONSTRAINT chk_roles_code
        CHECK (length(trim(role_code)) > 0)
);

COMMENT ON TABLE roles
IS 'System Role Master';

COMMENT ON COLUMN roles.role_code
IS 'Unique Role Code';

COMMENT ON COLUMN roles.role_name
IS 'Display Role Name';

COMMENT ON COLUMN roles.is_system
IS 'Built-in system role';

CREATE INDEX idx_roles_code
ON roles(role_code);

CREATE INDEX idx_roles_active
ON roles(is_active);

CREATE INDEX idx_roles_deleted
ON roles(deleted_at);

## permissions

CREATE TABLE permissions (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    permission_code VARCHAR(100) NOT NULL,
    permission_name VARCHAR(255) NOT NULL,
    module VARCHAR(50) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by BIGINT,
    deleted_at TIMESTAMPTZ,
    deleted_by BIGINT,
    version INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT pk_permissions
        PRIMARY KEY (id),
    CONSTRAINT uq_permissions_uuid
        UNIQUE (uuid),
    CONSTRAINT uq_permissions_code
        UNIQUE (permission_code),
    CONSTRAINT chk_permissions_code
        CHECK (length(trim(permission_code)) > 0)
);

COMMENT ON TABLE permissions
IS 'System Permission Master';

COMMENT ON COLUMN permissions.permission_code
IS 'Unique Permission Code';

COMMENT ON COLUMN permissions.permission_name
IS 'Permission Display Name';

COMMENT ON COLUMN permissions.module
IS 'ERP Module Name';

CREATE INDEX idx_permissions_code
ON permissions(permission_code);

CREATE INDEX idx_permissions_module
ON permissions(module);

CREATE INDEX idx_permissions_active
ON permissions(is_active);

CREATE INDEX idx_permissions_deleted
ON permissions(deleted_at);

## user_roles

CREATE TABLE user_roles (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expired_at TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by BIGINT,
    deleted_at TIMESTAMPTZ,
    deleted_by BIGINT,
    version INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT pk_user_roles
        PRIMARY KEY (id),
    CONSTRAINT uq_user_roles_uuid
        UNIQUE (uuid),
    CONSTRAINT uq_user_roles
        UNIQUE (user_id, role_id),
    CONSTRAINT fk_user_roles_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT fk_user_roles_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

COMMENT ON TABLE user_roles
IS 'Relationship between Users and Roles';

COMMENT ON COLUMN user_roles.user_id
IS 'Reference User';

COMMENT ON COLUMN user_roles.role_id
IS 'Reference Role';

COMMENT ON COLUMN user_roles.assigned_at
IS 'Role Assigned Date';

COMMENT ON COLUMN user_roles.expired_at
IS 'Role Expiration Date';

CREATE INDEX idx_user_roles_user
ON user_roles(user_id);

CREATE INDEX idx_user_roles_role
ON user_roles(role_id);

CREATE INDEX idx_user_roles_active
ON user_roles(is_active);

CREATE INDEX idx_user_roles_deleted
ON user_roles(deleted_at);

## role_permissions

CREATE TABLE role_permissions (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by BIGINT,
    deleted_at TIMESTAMPTZ,
    deleted_by BIGINT,
    version INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT pk_role_permissions
        PRIMARY KEY (id),
    CONSTRAINT uq_role_permissions_uuid
        UNIQUE (uuid),
    CONSTRAINT uq_role_permissions
        UNIQUE (role_id, permission_id),
    CONSTRAINT fk_role_permissions_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT fk_role_permissions_permission
        FOREIGN KEY (permission_id)
        REFERENCES permissions(id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

COMMENT ON TABLE role_permissions
IS 'Relationship between Roles and Permissions';

COMMENT ON COLUMN role_permissions.role_id
IS 'Reference Role';

COMMENT ON COLUMN role_permissions.permission_id
IS 'Reference Permission';

CREATE INDEX idx_role_permissions_role
ON role_permissions(role_id);

CREATE INDEX idx_role_permissions_permission
ON role_permissions(permission_id);

CREATE INDEX idx_role_permissions_active
ON role_permissions(is_active);

CREATE INDEX idx_role_permissions_deleted
ON role_permissions(deleted_at);