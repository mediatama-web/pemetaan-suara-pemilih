<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Situs Sedang Dalam Pemeliharaan</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style type="text/tailwindcss">
      @theme {
        --color-clifford: #da373d;
      }
    </style>
  </head>
  <body class="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center justify-center px-4">
    <div class="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
      <div class="flex justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 class="text-2xl md:text-3xl font-bold text-blue-700 mb-2">
        Sedang Dalam Pemeliharaan
      </h1>

      <p class="text-gray-600 mb-6 leading-relaxed">
        Kami sedang melakukan pemeliharaan sistem untuk meningkatkan layanan kami.<br />
        Mohon maaf atas ketidaknyamanannya. Silakan coba beberapa saat lagi.
      </p>

      <button onclick="location.reload()"
        class="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow transition">
        Muat Ulang Halaman
      </button>

      <div class="mt-8 text-sm text-gray-400">
        &copy; {{ now()->year }} Mediatama Web Indonesia.
      </div>
    </div>
  </body>
</html>
