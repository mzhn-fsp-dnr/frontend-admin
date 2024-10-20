export enum ROLES {
    OPERATOR = 'operator',
    ADMIN = 'admin',
}

export const LOCAL_ROLES: Record<ROLES, string> = {
    [ROLES.OPERATOR]: 'Оператор',
    [ROLES.ADMIN]: 'Администратор',
};