var DeleteModule = (function () {
    /// INI BORRAR ELEMENTO DE BASE DE DATOS
    // Borrar un elemento partiendo de su identificador
    deleteJob = function (JobName) {
        $.mobile.loading("show", {
            text: "Borrando el registro...",
            textVisible: true,
            textonly: false,
            html: ""
        });
        JobName = JobName.split(' ').join('-');
        // Definimos la transición a ejecutar
        var tx = getDataBase().transaction(["Job"], "readwrite");
        // Obtenemos el objeto almacenador de elementos de la tabla de base de datos
        var store = tx.objectStore("Job");
        // Borramos el elemento a partir de su identificador
        var request = store.delete(JobName);
        request.onsuccess = function (e) {
            // El registro ha sido eliminado de la base de datos
            alert('Película eliminada.', 'OfertaDB');
            // Mostramos la página con los nuevos elementos
            $.mobile.changePage('#pgJob', { transition: getTransitionMode() });
        }
        request.onerror = function (e) {
            alert('No se ha eliminado la película, intentelo otra vez.', 'OfertaDB');
            return;
        }
        $.mobile.loading("hide");
    };
    /// FIN BORRAR ELEMENTO DE BASE DE DATOS
    return {
        delete: deleteJob
    };
}());