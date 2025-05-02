import TodoInterface from '../types/TodoInterface';

export class Todo implements TodoInterface {
    id: number;
    title: string;
    description: string;
    status: string;
    deadline: string | null;

    constructor(id: number, title: string, description: string, status: string, deadline: string | null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.deadline = deadline;
    }

    isOverdue(): boolean {
        if (this.deadline === null) return false;
        const now = new Date();
        const deadlineDate = new Date(this.deadline);
        return deadlineDate < now && this.status !== 'done';
    }

    dueTodays(): number {
        if (this.deadline === null) return 0;
        const now = new Date();
        const deadlineDate = new Date(this.deadline);
        const diffTime = Math.abs(deadlineDate.getTime() - now.getTime());
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    omittedDescription(): string {
        const maxLength = 25;
        if (this.description.length > maxLength) {
            return this.description.substring(0, maxLength) + '...';
        }
        return this.description;
    }

    isStatus(status: string): boolean {
        return this.status === status;
    }
}