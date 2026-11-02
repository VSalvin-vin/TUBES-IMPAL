
import '../css/app.css';

import Register from './pages/Register';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Placeholder from './pages/Placeholder';

createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Placeholder title="Beranda" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<Placeholder title="Lupa Kata Sandi" />} />
                <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
                <Route path="*" element={<Placeholder title="Halaman tidak ditemukan" />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
