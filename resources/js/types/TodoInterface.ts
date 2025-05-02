interface TodoInterface {
    id: number;
    title: string;
    description: string;
    status: string;
    deadline: string | null;

    isOverdue: () => boolean;
    dueTodays: () => number;
    isStatus: (status: string) => boolean;
    omittedDescription: () => string;
};

export default TodoInterface;