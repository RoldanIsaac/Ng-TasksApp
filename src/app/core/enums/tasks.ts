export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export enum TaskEndpoints {
  getAll = 'tasks',
  getOne = 'tasks',
  create = 'tasks',
  update = 'tasks',
  delete = 'tasks',
}

export const statuses = [
  { value: TaskStatus.PENDING, viewValue: 'Pending' },
  { value: TaskStatus.COMPLETED, viewValue: 'Completed' },
];
