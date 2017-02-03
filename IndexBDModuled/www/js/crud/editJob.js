var EditModule = (function () {
    // INI ACTUALIZAR UN ELEMENTO DE IndexedDB
    // Proceso de actualización de los registros de base de datos definidos desde la pantalla de edición
    updateJob = function () {
        // Obtener el contenido de la pantalla de edición
        var JobRec = pgEditJobGetRec();
        // Mostrar mensaje de cargando durante la ejecución del proceso
        $.mobile.loading("show", {
            text: "Update record...",
            textVisible: true,
            textonly: false,
            html: ""
        });
        // Buscar un job específico
        var JobID = JobRec.JobID;
        JobRec.JobID = JobID;
        JobID = JobID.split(' ').join('-');
        // Definir la transacción a ejectur
        var tx = getDataBase().transaction(["Job"], "readwrite");
        // Obtener el objeto store de almacenar los elemntos
        var store = tx.objectStore("Job");
        // Obtener los registros desde el objeto encargado de almacenarlos
        store.get(JobID).onsuccess = function (e) {
            var request = store.put(JobRec);
            request.onsuccess = function (e) {
                // El registro a sido guardado
                alert('Oferta actualizada.', 'Oferta');
                // Limpiamos los elementos del formulario
                pgEditJobClear();
                // Mostrar la pantalla de listado de los elementos de base de datos
                $.mobile.changePage('#pgJob', { transition: getTransitionMode() });
            }
            request.onerror = function (e) {
                alert('No se ha actualizado la película, intentelo otra vez.', 'Oferta');
                return;
            }
        };
        // Ocultamos el objeto de CARGANDO y mostramos el resultado
        $.mobile.loading("hide");
    };
    // Muestra el elemento seleccionado desde la pantalla de listado de elementos
    // Realiza la visualización en la pantalla de edición
    editJob = function (JobID) {
        $.mobile.loading("show", {
            text: "Reading record...",
            textVisible: true,
            textonly: false,
            html: ""
        });
        // Realizamos el vaciado de los valores introducidos por el usuario
        pgEditJobClear();
        JobID = JobID.toString();
        JobID = JobID.split(' ').join('-');
        var JobRec = {};
        // Se relaiza una transacción para la lectura de los valores de base de datos
        var tx = getDataBase().transaction(["Job"], "readwrite");
        // Se obtiene el objeto encargado de leer el almacenamiento
        var store = tx.objectStore("Job");
        // Se realiza la busqueda del elemento a traves de su clave primaria
        var request = store.get(JobID);
        request.onsuccess = function (e) {
            JobRec = e.target.result;
            // En caso de que todo sea correcto preparmos la visualización
            // La clave primaria es de solo lectura
            $('#pgEditJobID').attr('readonly', 'readonly');
            // La clave primaria no puede ser borrada
            $('#pgEditJobID').attr('data-clear-btn', 'false');
            // Actualiza cada uno de los controles de la pantalla de edición
            // Damos formato a la clave primaria del registro
            var pkey = JobRec.JobID;
            //pkey = pkey.split('-').join(' ');
            JobRec.JobID = pkey;
            $('#pgEditJobID').val(JobRec.JobID);
            $('#pgEditJobCompany').val(JobRec.JobCompany);
            $('#pgEditJobPosition').val(JobRec.JobPosition);
            $('#pgEditJobAddress').val(JobRec.JobAddress);

        }
        // En caso de encontrar un error se lo notificamos al usuario
        request.onerror = function (e) {
            $('#alertboxheader h1').text('Error OfertaDB');
            $('#alertboxtitle').text(JobID.split('-').join(' '));
            $('#alertboxprompt').text('Se ha encontrado un error al realizar la lectura del valor, intentelo otra vez!');
            $('#alertboxok').data('topage', 'pgEditJob');
            $('#alertboxok').data('id', JobID.split(' ').join('-'));
            $.mobile.changePage('#alertbox', { transition: 'pop' });
            return;
        }
        $.mobile.loading("hide");
    };
    // Realizar la lectura de los registros de la base de datos y mostrarlos en la pantalla de edición
    pgEditJobeditJob = function (JobID) {
        $.mobile.loading("show", {
            text: "Lectura de elementos...",
            textVisible: true,
            textonly: false,
            html: ""
        });
        // Se vacian los elementos del formulario
        pgEditJobClear();
        JobID = JobID.split(' ').join('-');
        //if (JobID.contains("-")) {
            //JobID = JobID.split(' ').join('-');
        //}
        var JobRec = {};
        // Se define una transacción para realizar la lectura desde la base de datos
        var tx = getDataBase().transaction(["Job"], "readonly");
        // Obtenemos el objeto almacenador de la tabla Job
        var store = tx.objectStore("Job");
        // Obtenemos el registro a partir de su clave primaria
        var request = store.get(JobID);
        request.onsuccess = function (e) {
            JobRec = e.target.result;
            // En caso de que todo este correcto
            // Establecemos la clave primaria de solo lectura
            $('#pgEditJobJobID').attr('readonly', 'readonly');
            // Establecemos que la clave primaria no pueda ser borrada
            $('#pgEditJobJobID').attr('data-clear-btn', 'false');
            // Se actualizan cada uno de los controles de la ventana de edición
            // Se formatea y vacía la clave primaria
            var pkey = JobRec.JobID;
            pkey = pkey.split('-').join(' ');
            JobRec.JobID = pkey;
            $('#pgEditJobID').val(JobRec.JobID);
            $('#pgEditJobCompany').val(JobRec.JobCompany);
            $('#pgEditJobPosition').val(JobRec.JobPosition);
            $('#pgEditJobAddress').val(JobRec.JobAddress);
        }
        // Se ha encontrado un error
        request.onerror = function (e) {
            $('#alertboxheader h1').text('Job Error');
            $('#alertboxtitle').text(JobID.split('-').join(' '));
            $('#alertboxprompt').text('An error was encountered trying to read this record, please try again!');
            $('#alertboxok').data('topage', 'pgEditJob');
            $('#alertboxok').data('id', JobID.split(' ').join('-'));
            $.mobile.changePage('#alertbox', { transition: 'pop' });
            return;
        }
        $.mobile.loading("hide");
    };
    // FIN ACTUALIZAR UN ELEMENTO DE IndexedDB

    // Vacía los elementos de la pantalla de edición
    function pgEditJobClear() {
        $('#pgEditJobID').val('');
        $('#pgEditJobCompany').val('');
        $('#pgEditJobPosition').val('');
        $('#pgEditJobAddress').val('');
    }
    // Obtiene los valores introducidos por el usuario en la pantalla de edición y retorna un objeto para su almacenamiento
    function pgEditJobGetRec() {
        //define the new record
        var JobRec = {};
        JobRec.JobID = $('#pgEditJobID').val();
        JobRec.JobCompany = $('#pgEditJobCompany').val();
        JobRec.JobPosition = $('#pgEditJobPosition').val();
        JobRec.JobAddress = $('#pgEditJobAddress').val();
        return JobRec;
    }

    return {
        update: updateJob,
        edit: editJob,
        display: pgEditJobeditJob,
        clear: pgEditJobClear,
        getValues: pgEditJobGetRec

    };
}());