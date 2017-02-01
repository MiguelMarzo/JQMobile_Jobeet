// Este módulo implementa la gestión del modelo de datos a partir de las accciones de usuario obtenidas desde el control

var JobModule = (function () {
    // INI Gestor CRUD de ofertas con IndexedDB
    var allJobs = function () {
        return ShowModule.check();
    };
    var addJob = function (job) {
        // Obtener los elementos del formulario y trasladarlos a un objeto
        var JobRec = NewModule.getValues();
        NewModule.check(JobRec);
        NewModule.clear();
    };
    var saveJob = function (job) {
        // Obtener los elementos del formulario y trasladarlos a un objeto
        var JobRec = NewModule.getValues();
        NewModule.add(JobRec);
        NewModule.clear();
    };
    var editJob = function (job) {
        // Limpiar la página de contenido
        EditModule.clear();
        //  Cargar de los elementos del menú
        var JobName = $('#pgEditJob').data('id');
        // Lectura de los elementos desde la base de datos y refresco de la pantalla
        EditModule.edit(JobName);
    };
    var updateJob = function (job) {
        // Actualzar los valores del registro
        EditModule.update();
    };
    var deleteJob = function (job) {
        // Eliminar un registro
        DeleteModule.delete(job);
    };
    // FIN Gestor CRUD de ofertas con IndexedDB

    return {
        add: addJob,
        save: saveJob,
        edit: editJob,
        update: updateJob,
        deleteJob: deleteJob,
        getAll: allJobs
    };
}());