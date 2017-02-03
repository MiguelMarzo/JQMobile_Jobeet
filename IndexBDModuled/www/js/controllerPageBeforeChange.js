/// INI  CONTROL: Enlazar la Vista y la Capa de lógica : Gestión de eventos

//  Antes de cargar la pantalla, analiza la ventana a mostrar al usuario y determina los datos a obtener de base de datos.
var StateMachineModule = (function () {
    jobBindings = function (JobID) {
        // 1: Ejecución antes de que se haya cargado la página, previo a mostrar la lista de elementos al usuario
        $(document).on('pagebeforechange', function (e, data) {
            // Obtenemos la página a la que nos dirigimos
            var toPage = data.toPage[0].id;
            switch (toPage) {
                case 'pgJob':
                    $('#pgRptJobBack').data('from', 'pgJob');
                    // Repite la consulta a base de datos para la obtención de elementos
                    JobModule.getAll();
                    break;
                case 'pgEditJob':
                    $('#pgRptJobBack').data('from', 'pgEditJob');
                    // Edición
                    JobModule.edit();
                    break;
                case 'pgAddJob':
                    $('#pgRptJobBack').data('from', 'pgAddJob');
                    //  Cargar de los elementos del menú antes de que se haya mostrado la página
                    JobModule.add();
                    break;
            }
        });
    };
    /// FIN  CONTROL: Enlazar la Vista y la Capa de lógia : Gestión de eventos

    return {
        controller: jobBindings
    };
}());