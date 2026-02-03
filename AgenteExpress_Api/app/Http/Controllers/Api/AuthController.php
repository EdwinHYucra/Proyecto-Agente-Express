<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UsuarioPlataforma;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function registrar(Request $request)
    {
        $data = $request->validate([
            'nombre' => ['required', 'string', 'max:120'],
            'correo' => ['required', 'email', 'max:150', 'unique:users,email'],
            'clave'  => ['required', 'string', 'min:8', 'max:100'],
            'rol'    => ['nullable', 'in:admin_general,soporte_tecnico,dueno_afiliado,empleado_afiliado'],
        ]);

        $user = User::create([
            'name' => $data['nombre'],
            'email' => $data['correo'],
            'password' => Hash::make($data['clave']),
        ]);

        UsuarioPlataforma::create([
            'user_id' => $user->id,
            'correo'  => $user->email,
            'clave'   => $user->password, // hash (para no romper si clave es NOT NULL)
            'rol'     => $data['rol'] ?? 'dueno_afiliado',
            'estado'  => 'activo',
            'intentos_fallidos' => 0,
            'fecha_creacion' => now(),
            'fecha_actualizacion' => now(),
        ]);


        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'token' => $token,
            'usuario' => [
                'id' => $user->id,
                'nombre' => $user->name,
                'correo' => $user->email,
                'rol' => $user->usuarioPlataforma?->rol,
            ]
        ], 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'correo' => ['required', 'email'],
            'clave'  => ['required', 'string'],
        ]);

        $user = User::where('email', $data['correo'])->first();

        if (!$user || !Hash::check($data['clave'], $user->password)) {
            throw ValidationException::withMessages([
                'correo' => ['Credenciales inválidas.'],
            ]);
        }

        // (opcional) Revocar tokens anteriores:
        // $user->tokens()->delete();

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'token' => $token,
            'usuario' => [
                'id' => $user->id,
                'nombre' => $user->name,
                'correo' => $user->email,
                'rol' => $user->usuarioPlataforma?->rol,
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['mensaje' => 'Sesión cerrada correctamente.']);
    }

    public function yo(Request $request)
    {
        $user = $request->user()->load('usuarioPlataforma');

        return response()->json([
            'id' => $user->id,
            'nombre' => $user->name,
            'correo' => $user->email,
            'rol' => $user->usuarioPlataforma?->rol,
        ]);
    }
}
