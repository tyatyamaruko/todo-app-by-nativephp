interface TodoInterface {
    id: number;
    title: string;
    description: string;
    status: string;
    deadline: string | null;

    isOverdue: () => boolean;
    dueTodays: () => number;
    isPending: () => boolean;
    isProgress: () => boolean;
    isCompleted: () => boolean;
};

export default TodoInterface;