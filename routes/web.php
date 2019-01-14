<?php

Route::any('/{any?}', 'VueController@getSite')->where('any', /*'[\/\w\.-]*'*/ '^(?!api).*$');
