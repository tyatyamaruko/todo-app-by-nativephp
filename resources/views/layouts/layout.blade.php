<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@^2.0/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .kanban-column-content {
            height: 500px;
            overflow-y: scroll;
        }
    </style>
</head>

<body class="bg-gradient-to-r from-blue-100 to-purple-300 min-h-screen flex justify-center py-10">
    @yield('content')
    @viteReactRefresh
    @vite('resources/js/app.tsx')
</body>

</html>
