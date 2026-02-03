<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
{
    if (Schema::hasTable('usuarios_plataforma')) {
        return;
    }

    Schema::create('usuarios_plataforma', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
        $table->unsignedBigInteger('afiliado_id')->nullable();

        $table->enum('rol', ['admin_general','soporte_tecnico','dueno_afiliado','empleado_afiliado'])
              ->default('dueno_afiliado');

        $table->enum('estado', ['activo','bloqueado'])->default('activo');

        $table->unsignedInteger('intentos_fallidos')->default(0);
        $table->timestamp('bloqueado_hasta')->nullable();
        $table->timestamp('ultimo_login')->nullable();

        $table->timestamps();

        $table->unique('user_id');
        $table->index('afiliado_id');
        $table->index('rol');
        $table->index('estado');
    });
}


    public function down(): void
    {
        Schema::dropIfExists('usuarios_plataforma');
    }
};
