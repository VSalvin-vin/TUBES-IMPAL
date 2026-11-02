<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150', 'unique:users,email'],
            'noTelepon' => ['required', 'string', 'max:20'],
            'kataSandi' => ['required', 'string', 'same:konfirmasiKataSandi', Password::min(8)],
        ], [
            'nama.required' => 'Nama wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah terdaftar.',
            'noTelepon.required' => 'Nomor telepon wajib diisi.',
            'kataSandi.required' => 'Kata sandi wajib diisi.',
            'kataSandi.confirmed' => 'Konfirmasi kata sandi tidak cocok.',
            'kataSandi.min' => 'Kata sandi minimal 8 karakter.',
        ]);

        $user = User::create([
            'name' => $validated['nama'],
            'email' => $validated['email'],
            'phone' => $validated['noTelepon'],
            'password' => Hash::make($validated['kataSandi']),
            'role' => 'penyewa',
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Registrasi berhasil.',
            'redirect' => '/dashboard',
        ], 201);
    }
}
