/// INI  CONTROL: Enlazar la Vista y la Capa de lógica : Gestión de eventos

// A lo largo de la ejecución de la página se encarga de enlazar los eventos de usuario con los procedimientos de tratamiento de datos

//*****************************************************************
$(function () {
    // 2: Ejecución una vez que se ha cargado la página
    // Establece los eventos para cada una de las páginas de la aplicación:
    // - Añadir elementos => ***** Add Page - Ini *****
    // - Mostrar elementos => ***** Listing Page *****
    // - Editar elementos => ***** Edit Page *****

    $(document).on('pagecontainershow', function (e, ui) {

        //***** Add Page - Ini *****
        /// Añadir una nueva película
        /// Eventos ejecutados desde la página donde se muestra el formulario de inserción de valores

        // INI NAV Vuelta atrás
        // Código ejecutado cuando el botón de vuelta atrás es ejecutado desde la página de añadir nuevo elemento
        // Vuelta atrás desde Añadir Película
        $('#pgAddJobBack').on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Volver a la pantalla de listado de elementos
            $.mobile.changePage('#pgJob', { transition: getTransitionMode() });
        });
        // FIN NAV Vuelta atrás
        // INI NAV Guardar
        // Código ejecutado cuando se pulsa el boton de guardar dede la pantalla de Añadir elmento
        $('#pgAddJobSave').on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Almacenar los objetos en la base de datos
            JobModule.save();
            // Volver a la pantalla de listado de elementos
            $.mobile.changePage('#pgJob', { transition: getTransitionMode() });
        });
        // FIN NAV Guardar
        //***** Add Page - End *****

        //***** Listing Page *****
        /// Mostrar películas
        /// Listado de ofertas almacenados en la base de datos

        // Código ejecutado cuando se pulsa la visualización de elmentos
        // Evento click en listado de ofertas
        $(document).on('click', '#pgJobList a', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Obtener el enlace pulsado desde la lista de elementos y formatearlo
            var href = $(this).data('id').toString();
            href = href.split(' ').join('-');
            // Almacenar el id del elemento para su edición 
            $('#pgEditJob').data('id', href);
            // Navegar a la página de edición
            $.mobile.changePage('#pgEditJob', { transition: getTransitionMode() });
        });
        // Código ejecutado cuando es pulsa sobre boton nuevo en el listado de elementos
        // Click en el botón Nuevo desde la pantalla de listado de elementos
        $('#pgJobNew').on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Accedemos a la pantalla de añadir un nuevo elemento desde el listado de películas
            $('#pgAddJob').data('from', 'pgJob');
            // Mostrar la pantalla activa y las opciones de usuario
            $('#pgAddJobheader h1').text('Ofertas > Añadir oferta');
            $('#pgAddJobMenu').show();
            // Navegar a la pantalla de añadir un nuevo elemento
            $.mobile.changePage('#pgAddJob', { transition: getTransitionMode() });
        });
        //***** Listing Page - End *****


        //***** Edit Page *****
        /// Pantalla de edición
        /// Pantalla accesible despues de seleccionar un elemento de la lista
        /// Modificamos los valores del elemento a partir del id

        // Código ejecutado cuando el boton de vuelta atrás es pulsado desde la pantalla de edición
        // Botón Vuelta atrás pulsado
        $('#pgEditJobBack').on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Volver atrás a la pantalla de mostrar los elementos
            $.mobile.changePage('#pgJob', { transition: getTransitionMode() });
        });
        // Código ejecutado cuando se pulsa el boton de Actualizar elemento
        // Boton de actualizar dede la pantalla de Edición
        $('#pgEditJobUpdate').on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // guardar registro actualizado en IndexedDB
            EditModule.update();
        });
        // Código ejectuado cuando se pulsa el boton de borrado desde la pantalla de edición
        // Click en botón de borrado
        $('#pgEditJobDelete').on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Lectura del identificador del elemento seleccionado por el usuario
            var JobID = $('#pgEditJobID').val();
            // INI :: Mostrar mensaje de confirmación
            $('#msgboxheader h1').text('Confirm Delete');
            $('#msgboxtitle').text(JobID.split('-').join(' '));
            $('#msgboxprompt').text('Are you sure that you want to delete this job? This action cannot be undone.');
            $('#msgboxyes').data('method', 'deleteJob');
            $('#msgboxno').data('method', 'edit');
            $('#msgboxyes').data('id', JobID.split(' ').join('-'));
            $('#msgboxno').data('id', JobID.split(' ').join('-'));
            $('#msgboxyes').data('topage', 'pgEditJob');
            $('#msgboxno').data('topage', 'pgEditJob');
            $.mobile.changePage('#msgbox', { transition: 'pop' });
            // FIN :: Mostrar mensaje de confirmación

        });

        // Boton de mostrar elementos
        // Click en bton de listado de los elementos almacecnados en la base de datos
        $(document).on('click', '#pgEditJobRightPnlLV a', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Obtener el identificador del elemenetos a traves del enlace pulsado
            var href = $(this).data('id');
            href = href.split(' ').join('-');
            // Lectura del elemento desde la base de datos y actualización de la pantalla
            EditModule.display(href);
        });
        //***** Edit Page - End *****

    });

    /// FIN  CONTROL: Enlazar la Vista y la Capa de lógia : Gestión de eventos
});
