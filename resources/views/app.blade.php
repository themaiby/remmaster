<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{--<link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">--}}
    <link rel="stylesheet" href="{{ mix('css/style.css') }}">
    <title>Remmaster</title>
</head>
<body>

<div id="app"></div>
<script src="{{ mix('js/app.js') }}{{ ((config('app.env') !== 'production') ? '?dev=' . str_random(24) : '') }}">

</script>
</body>
</html>
