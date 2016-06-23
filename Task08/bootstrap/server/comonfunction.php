<?php

	function filterTextSpecialChar($str) {
		$checkval = addslashes($str);
		$checkval = htmlspecialchars($checkval);
		return $checkval;
	}

?>