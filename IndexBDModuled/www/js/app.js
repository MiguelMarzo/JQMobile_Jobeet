$(function () {
    // Se define objeto de aplicación
    var JobsDatabase = {};
    // variables para la conexión con la base de datos
    var dbJobsDatabase;
    var dbName = "JobsDatabase";
    var dbVersion = 1;
    var pgtransition = 'slide';
    /// INI EJECUCIÓN de FUNCIÓN PRINCIPAL
    (function (app) {
        // Definición de variables
        var JobLi = '<li><a data-id="Z2"><h2>Z1</h2><p>DESCRIPTION</p><p><span class="ui-li-count">COUNTBUBBLE</span></p></a></li>';
        var JobLiRi = '<li><a data-id="Z2">Z1</a></li>';
        var JobHdr = '<li data-role="list-divider">Your Jobs</li>';
        var noJob = '<li id="noJob">You have no Jobs</li>';
        app.init = function () {
            // INI INICIALIZACIÓN DEL MODELO
            // Realizar la conexión con la base de datos
            var request = indexedDB.open(dbName, dbVersion);
            //verificar si es necesario una actualizacación debido a cambio de versión de la base de datos
            request.onupgradeneeded = function (e) {
                var thisDB = e.target.result;
                var store = null;
                // Generación de las tablas necesarias para la base de datos
                if (!thisDB.objectStoreNames.contains("Job")) {
                    // Generación de la clave primaria (objeto almacenado) accesible a traves de JobName
                    store = thisDB.createObjectStore("Job", { keyPath: "JobName" });
                }
            };
            // Conexión exitosa con la base de datos
            request.onsuccess = function (e) {
                dbJobsDatabase = e.target.result;
            }
            // FIN INICIALIZACIÓN DEL MODELO

            // INI CONTROLADOR
            // Función encargada de la gestión de los eventos de usuario
            StateMachineModule.controller();
            // FIN CONTROLADOR

            /// INI Gestión de mensaje alerta
            $('#msgboxyes').on('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                // Se almacena el metodo que se ha lanzado en la alerta
                var yesmethod = $('#msgboxyes').data('method');
                // Se almacena la respuesta del usuario
                var yesid = $('#msgboxyes').data('id');
                // Se trasladan estos valores a app 
                JobModule[yesmethod](yesid);
            });
            $('#msgboxno').on('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                var nomethod = $('#msgboxno').data('method');
                var noid = $('#msgboxno').data('id');
                var toPage = $('#msgboxno').data('topage');
                // Redirecciona a la página anterior depues de realizar el borrado del registro
                $.mobile.changePage('#' + toPage, { transition: pgtransition });
                JobModule[nomethod](noid);
            });
            $('#alertboxok').on('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                var toPage = $('#alertboxok').data('topage');
                // show the page to display after ok is clicked
                $.mobile.changePage('#' + toPage, { transition: pgtransition });
            });
            /// FIN Gestión de mensaje alerta
        };
        /// FIN EJECUCIÓN de FUNCIÓN PRINCIPAL
        
        // ********************************************************** 
        // INI Funciones Getter de acceso a parametros globales
        getDataBase = function () {
            return dbJobsDatabase
        };
       getTransitionMode = function () {
            return pgtransition;
       };

       getJobLi = function () {
           return JobLi;
       };
       getJobLiRi = function () {
           return JobLiRi;
       };
       getJobHdr = function () {
           return JobHdr;
       };
       getNoJob = function () {
           return noJob;
       };
        // FIN Funciones Getter de acceso a parametros globales
        // ********************************************************** 
        // Arrancamos la inicialización de la aplicación
        app.init();
    })(JobsDatabase);
});