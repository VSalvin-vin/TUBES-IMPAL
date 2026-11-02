<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\RedirectResponse;

class GoogleAuthController extends Controller
{
    public function redirect(): RedirectResponse
    {
        $url = Socialite::driver('google')
            ->redirect()
            ->getTargetUrl();

        $separator = str_contains($url, '?') ? '&' : '?';

        return redirect()->away(
            $url . $separator . 'prompt=select_account'
        );
    }

    public function callback(): RedirectResponse
    {
        $googleUser = Socialite::driver('google')->user();

        $email = $googleUser->getEmail();
        $googleId = $googleUser->getId();

        // Pastikan Google memberikan email terverifikasi.
        if (
            !$email ||
            !filter_var($email, FILTER_VALIDATE_EMAIL) ||
            !($googleUser->user['email_verified'] ?? false)
        ) {
            return redirect('/login')
                ->with('error', 'Email Google tidak terverifikasi.');
        }

        // Cari akun yang sebelumnya sudah terhubung ke Google.
        $user = User::where('google_id', $googleId)->first();

        if (!$user) {
            // Jika email sudah terdaftar, hubungkan akun yang sama.
            $user = User::where('email', $email)->first();

            if ($user) {
                if ($user->google_id && $user->google_id !== $googleId) {
                    return redirect('/login')
                        ->with('error', 'Akun Google tidak dapat dihubungkan.');
                }

                $user->google_id = $googleId;
                $user->save();
            } else {
                // Buat akun baru jika belum terdaftar.
                $user = User::create([
                    'name' => $googleUser->getName() ?: 'Pengguna RenTech',
                    'email' => $email,
                    'google_id' => $googleId,
                    'password' => Str::random(40),
                    'role' => 'penyewa',
                ]);
            }
        }

        if (!$user->is_active) {
            return redirect('/login')
                ->with('error', 'Akun RenTech Anda tidak aktif.');
        }

        Auth::login($user);
        request()->session()->regenerate();

        return redirect('/dashboard');
    }
}
