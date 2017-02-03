var ShowModule = (function () {
   


    // Muestra los registros a lo largo de la ejecución de la aplicación.
    displayJob = function (JobObj) {
        $.mobile.loading("show", {
            text: "Mostrando elementos...",
            textVisible: true,
            textonly: false,
            html: ""
        });
        // Se genera un string vacío para contener la información 
        var html = '';
        // Asegurarse de que el iterador esta bien definidio 
        var n;
        // Bucle sobre los registros generador de un elemento cada vez
        // añadir el html generado al final de la lista de elementos
        for (n in JobObj) {
            // Obtener los detalles de elemento
            var JobRec = JobObj[n];
            // Vaciar la llave primiaria
            var pkey = JobRec.JobID;
            pkey = pkey.split(' ').join('-');
            //if (pkey.contains("-")) {
                //pkey = pkey.split(' ').join('-');
            //}
            JobRec.JobID = pkey;
            // Definir una nueva lína de la información obtenida
            var nItem = getJobLi();
            nItem = nItem.replace(/Z2/g, n);
            // Actualizar el  título, puede que sea multilínea
            var nTitle = '';
            // Asignar un título vacío
            //nTitle = n.split('-').join(' ');
            // Reemplazar el título
            nItem = nItem.replace(/Z1/g, nTitle);
            // Contador númerico de la película
            var nCountBubble = '';
            nCountBubble += JobRec.JobCompany;
            // reemplazar el contador de elemntos 
            nItem = nItem.replace(/COUNTBUBBLE/g, nCountBubble);
            // Actualizr la vista en cado de existir descripción
            var nDescription = '';
            nDescription += JobRec.JobPosition;
            // Reemplazar la descripción
            nItem = nItem.replace(/DESCRIPTION/g, nDescription);
            html += nItem;
        }
        // Actualizar la vista con la nueva estructura HTML geerada
        $('#pgJobList').html(getJobHdr() + html).listview('refresh');
        $.mobile.loading("hide");
    };
    /// FIN MOSTRAR ELEMENTOS REGISTRADOS EN LISTA DE ELEMENTOS
    // ********************************************************** 
    /// INI VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS
    /// Inicializa la base de datos en caso de no haber registros
    // Muestra los elementos en caso de existir o notifica a usuario que no hay elementos
    checkForJobStorage = function () {
        $.mobile.loading("show", {
            text: "Analizando base de datos...",
            textVisible: true,
            textonly: false,
            html: ""
        });
        // Obtener los registros de la base de datos IndexDB
        // cuando se retornan objetos estos se convierten en objetos JSON
        var JobObj = {};
        // Se define una transacción para la lectura de elementos desde la base de datos
        var tx = getDataBase().transaction(["Job"], "readonly");
        // Obtener el objeto alamcenador de la tabla de base de datos
        var store = tx.objectStore("Job");
        // Abrir un cursor para la lectura de todos los registros de base de datos
        var request = store.openCursor();
        request.onsuccess = function (e) {
            // Se devuleve el resultado
            var cursor = e.target.result;
            if (cursor) {
                JobObj[cursor.key] = cursor.value;
                // Se procesa el siguiente registro
                cursor.continue();
            }
            // Exten registros en la base de datos?
            if (!$.isEmptyObject(JobObj)) {
                // yes there are. pass them off to be displayed
                displayJob(JobObj);
            } else {
                // NO existes, mostramos el texto de ayuda
                $('#pgJobList').html(getJobHdr() + getNoJob()).listview('refresh');
            }
        }
        $.mobile.loading("hide");
        // se ha encontrado un error
        request.onerror = function (e) {
            $.mobile.loading("hide");
            // mostrar solo el texto de ayuda
            $('#pgJobList').html(getJobHdr() + getNoJob()).listview('refresh');
        }
    };
    /// FIN VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS
    // *************************




    return {
        show: displayJob,
        check: checkForJobStorage
    };
}());