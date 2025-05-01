@extends('layouts.layout')

@section('content')
    <div id="app" data-todos="{{ json_encode($todos) }}"></div>
@endsection