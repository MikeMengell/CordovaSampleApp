// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {

        var client = new WindowsAzure.MobileServiceClient('https://cordovamike-code.azurewebsites.net', 'https://cordovamikebbaa80e7937c42a1b99e2189a6045d4e.azurewebsites.net', 'dSknsoJaIikwHmsAcCWBglkSKMSQkz36');

        var todoItemTable = client.getTable('TodoItem');

        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        document.getElementById('get-data').addEventListener("click", getData);
        document.getElementById('save-data').addEventListener("click", saveData);

        function getData() {
            var query = todoItemTable.where({ id: 1 });

            query.read().then(function (todoItems) {
                var listItems = $.map(todoItems, function (item) {
                    return $('<li>')
                        .attr('data-todoitem-id', item.id)
                        .append($('<button class="item-delete">Delete</button>'))
                        .append($('<input type="checkbox" class="item-complete">').prop('checked', item.complete))
                        .append($('<div>').append($('<input class="item-text">').val(item.text)));
                });

                $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
                $('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
            }, handleError);
        }

        function handleError(error) {
            var text = error + (error.request ? ' - ' + error.request.status : '');
            $('#errorlog').append($('<li>').text(text));
        }

        function saveData() {

        }

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();