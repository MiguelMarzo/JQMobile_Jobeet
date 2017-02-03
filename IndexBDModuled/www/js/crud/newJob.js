var NewModule = (function () {

   
    var addJob = function (JobRec) {
        // TODO REVISE obtener el tipo de transición global
        getDataBase().transaction

        $.mobile.loading("show", {
            text: "Creating record...",
            textVisible: true,
            textonly: false,
            html: ""
        });
        // Limpiar el identificador almacenado con anterioridad
        var JobID = JobRec.JobID;
        JobID = JobID.split(' ').join('-');
        JobRec.JobID = JobID;
        // Guardar el objeto JSON en la base de datos
        // definir la transacción a ejecutar
        // TODO REVISE obtener el tipo de transición global
        var tx = getDataBase().transaction(["Job"], "readwrite");
        // Obtener los objetos para añadir un nuevo elemento
        var store = tx.objectStore("Job");
        // añadir al almacenamiento de anteriores elementos
        var request = store.add(JobRec);
        request.onsuccess = function (e) {
            // En caso de exito en el almacecnamiento mostramoms un mensaje de notificación al usuario
            alert('Job record successfully added.', 'Jobs Database');
            // Obtener desde la página de la que hemos accedido, en caso de que sea desde la de acceso volvemos a ella
            var pgFrom = $('#pgAddJob').data('from');
            switch (pgFrom) {
                case "pgSignIn":
                    // En caso de disponer de una pantalla de registro lo gestionaríamos desde aquí
                    // $.mobile.changePage('#pgSignIn', { transition: pgtransition });
                    break;
                default:
                    // limpiamos los elemntos del formulario
                    pgAddJobClear();
                    // Nos mantenemos en la misma página para seguir generando registros
            }
        }
        request.onerror = function (e) {
            // Mostramos un mensaje de notificación de error 
            alert('No se ha añadido la oferta.', 'Oferta');
        }
        $.mobile.loading("hide");
    };

    // Funciones genéricas para añadir elementos:
    // - Borrado de la pantalla: Realiza el borrado de los elementos mostrados en el formulario al usuario
    // - Obtener valores de la pantalla: Realiza la lectura de los elementos introducidos en el formulario por el usuario
    function pgAddJobClear() {
        $('#pgAddJobID').val('');
        $('#pgAddJobCompany').val('');
        $('#pgAddJobPosition').val('');
        $('#pgAddJobAddress').val('');
    };
    // Obtiene el contenido y genera un objeto para su almacenamiento
    function pgAddJobGetRec() {
        //define the new record
        var JobRec = {};
        JobRec.JobID = $('#pgAddJobID').val().trim();
        JobRec.JobCompany = $('#pgAddJobCompany').val().trim();
        JobRec.JobPosition = $('#pgAddJobPosition').val().trim();
        JobRec.JobAddress = $('#pgAddJobAddress').val().trim();
        return JobRec;
    };
    // FIN ALMACENAR NUEVO ELMENTO DE IndexedDB

    /// INI VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS despues de AÑADIR UN NUEVO ELEMENTO
    // Mostrar los registros en caso de existir, sino notificarselo al  usuario
    pgAddJobcheckForJobStorageR = function () {
        $.mobile.loading("show", {
            text: "Analizando base de datos...",
            textVisible: true,
            textonly: false,
            html: ""
        });
        //Obtener los registros desde la base de datos
        // en caso  de disponer registros, genera un objeto JSON por cada uno de ellos
        var JobObj = {};
        // Definir la transacción para realizar la lectura de elementos de la base de datos
        var tx = getDataBase().transaction(["Job"], "readonly");
        // Obtener el objeto encadao de almancenar los elementos en la base de datos
        var store = tx.objectStore("Job");
        // Abrir un cursor para realizar la lectura de cada uno de los registros
        var request = store.openCursor();
        request.onsuccess = function (e) {
            // Retornar el resutlado
            var cursor = e.target.result;
            if (cursor) {
                JobObj[cursor.key] = cursor.value;
                // procesar el siguiente registro
                cursor.continue();
            }
            // Existen más ofertas?
            if (!$.isEmptyObject(JobObj)) {
                // encaso de que existan pasamos a visualizarlas
                pgAddJobdisplayJobR(JobObj); 
            } else {
                // en caso de que no existan solo mostramos el texto de ayuda
                $('#pgAddJobRightPnlLV').html(getJobHdr + getNoJob()).listview('refresh');
            }
        }
        $.mobile.loading("hide");
        // en caso de encontrar un error
        request.onerror = function (e) {
            $.mobile.loading("hide");
            // solo se visualiza el texto de ayuda
            $('#pgAddJobRightPnlLV').html(getJobHdr() + getNoJob()).listview('refresh');
        }
    };
    // FIN VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS despues de AÑADIR UN NUEVO ELEMENTO
    pgAddJobdisplayJobR = function (JobObj) {
        $.mobile.loading("show", {
            text: "Displaying records...",
            textVisible: true,
            textonly: false,
            html: ""
        });
        // generamos un string vacio para almacenar el código html
        var html = '';
        // asegurarnos de que el iterador esta vacio
        var n;
        // loop over records and create a new list item for each
        // añadimos al final el código html
        for (n in JobObj) {
            // obtenemos los detalles del registro
            var JobRec = JobObj[n];
            // limpiamos la clave primaria
            var pkey = JobRec.JobID;
            pkey = pkey.split(' ').join('-');
            JobRec.JobID = pkey;
            // definimos una nueva lína para el nuevo elemento
            var nItem = getJobLiRi();
            nItem = nItem.replace(/Z2/g, n);
            // actualizmaos el título, este puede ser multi campo
            var nTitle = '';
            // limpiamos el título de espacios
            nTitle = n.split('-').join(' ');
            // reemplazaos el título
            nItem = nItem.replace(/Z1/g, nTitle);
            html += nItem;
        }
        // actualizamos la lista con el elemento de nueva creación
        $('#pgAddJobRightPnlLV').html(html).listview('refresh');
        $.mobile.loading("hide");
    };
    











    return {
        add: addJob,
        check: pgAddJobcheckForJobStorageR,
        display: pgAddJobdisplayJobR,
        clear: pgAddJobClear,
        getValues: pgAddJobGetRec
    };
}());