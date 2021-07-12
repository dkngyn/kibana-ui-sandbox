export async function fetchData(): Promise<Record<string, string[]>> {
  return Promise.resolve(mockContent);
}

const mockContent: Record<string, string[]> = {
  Roles: [
    'Sys admin',
    'Server admin',
    'Database owner',
    'Database security admin',
    'Access admin',
    'Backup operator',
    'DDL admin',
    'Data writer',
    'Data operator',
    'Setup admin',
    'Bulk admin',
    'Disk admin',
  ],
  Permissions: [
    'ACCESS',
    'ALL',
    'READ',
    'MODIFY',
    'EXECUTE',
    'BACKUP',
    'DDL',
    'MAINTENANCE',
    'DELETE',
  ],
  Boolean: ['is something', 'is something else', 'is some other thing'],
  Groups: ['READ', 'MODIFY', 'EXECUTE'],
  Users: ['admin', 'secAdmin', 'dan', 'sonar kay'],
  'AWS roles': ['EXECUTE', 'BACKUP', 'DDL', 'MAINTENANCE', 'DELETE'],
  Emails: ['imperva.com', 'jsonar.com'],
  'Managed by': ['ACCESS', 'ALL', 'READ'],
};
