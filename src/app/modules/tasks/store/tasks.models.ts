import { TaskStatus } from '../../../core/enums/tasks';

// Task
export interface Task {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
}
