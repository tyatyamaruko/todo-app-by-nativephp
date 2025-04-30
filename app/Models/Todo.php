<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = ['status', 'title', 'description'];

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isProgress(): bool
    {
        return $this->status === 'in-progress';
    }

    public function isCompleted(): bool
    {
        return $this->status === 'done';
    }

    public function isOverdue(): bool
    {
        $now = now();
        $deadline = $this->deadline;

        if ($deadline) {
            return $now->greaterThan($deadline);
        }

        return false;
    }

    public function isNothingDeadline(): bool
    {
        return $this->deadline === null;
    }

    public function dueToDays(): int
    {
        $now = now();
        $deadline = $this->deadline;
        if ($deadline) {
            return (int) $now->diffInDays($deadline);
        }

        return 0;
    }
}