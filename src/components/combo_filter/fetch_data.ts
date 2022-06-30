import { isEmpty } from 'lodash';

export async function fetchData(query: string): Promise<Record<string, string[]>> {
  // eslint-disable-next-line no-console
  console.log(`fetchData(${query})`);

  if (isEmpty(query)) return Promise.resolve(mockContent);

  const results = {};
  for (const key in mockContent) {
    if (mockContent.hasOwnProperty(key)) {
      const hits = mockContent[key].filter((v) => v.toLowerCase().indexOf(query) !== -1);
      const subject = `${key} (${hits.length})`;
      Object.assign(results, { [subject]: hits });
    }
  }

  return Promise.resolve(results);
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
