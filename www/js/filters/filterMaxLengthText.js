/**
 * Filtro para recortar frases que sobrepasen un numero de caracteres
 */

app.filter('maxLength', function() {
	var cadena;
	return function(text, maxLength) {
		var x = maxLength, i = 0, generated = "";

		// Si el tamano de text es menor a maxLength se retorna
		if (text.length <= maxLength) {
			return text;

		}
		cadena = text.split(" ", 3);

		do {
			if (generated.length + cadena[i].length > x) {

				if (generated.length === 0) {
					// sin word wrap, poner los x caracteres del texto
					generated = cadena[i].substring(0, maxLength);

				}

				break;
			}

			generated +=  " "+cadena[i];

			i++;
		} while (generated.length <= x);

		return generated;
	};
});