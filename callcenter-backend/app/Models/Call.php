<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Call extends Model
{
    protected $fillable = [
        'user_id',
        'start_time',
        'duration',
        'subject',
    ];

    protected $casts = [
        'call_time' => 'datetime',
    ];

    // Relation
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function ticket()
    {
        return $this->hasOne(Ticket::class);
    }


}
