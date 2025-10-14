import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../enums/tasks';

@Pipe({
  name: 'statusStyle',
})
export class StatusStylePipe implements PipeTransform {
  transform(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.PENDING:
        return 'bg-red-300 hover:bg-red-500 text-red-800 hover:text-white';
      case TaskStatus.COMPLETED:
        return 'bg-green-200 hover:bg-green-500 text-green-800 hover:text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  }
}
