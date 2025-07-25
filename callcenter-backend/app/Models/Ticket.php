<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'call_id',       
        'description',  
        'status',      
    ];

    // Relations
    public function call()
    {
        return $this->belongsTo(Call::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
