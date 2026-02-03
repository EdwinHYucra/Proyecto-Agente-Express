<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsuarioPlataforma extends Model
{
    protected $table = 'usuarios_plataforma';
    protected $primaryKey = 'id_usuario';
    public $incrementing = true;
    protected $keyType = 'int';

    // Tu tabla NO usa created_at / updated_at
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'id_afiliado',
        'correo',
        'clave',
        'rol',
        'estado',
        'intentos_fallidos',
        'bloqueado_hasta',
        'ultimo_login',
        'fecha_creacion',
        'fecha_actualizacion',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
