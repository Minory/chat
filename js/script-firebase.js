 
         // CREATE A REFERENCE TO FIREBASE, con esto hacemos la conexion a firebase
         var messagesRef = new Firebase('https://torrid-heat-6215.firebaseio.com');

         // REGISTER DOM ELEMENTS, aqui estamos tomando los elementos del html y les estamo asignando una variable
         var messageField = $('#messageInput');
         var nameField = $('#nameInput');
         var messageList = $('#example-messages');

         // LISTEN FOR KEYPRESS EVENT, bueno esto es cuando se quiere detectar algo en este caso, es el enter, su codigo es el 13 por eso dice .keyCode ==13 , entonces si se preciona enter va pasar esto
         messageField.keypress(function (e) {
             if (e.keyCode == 13) {
                 //FIELD VALUES
                 var username = nameField.val(); //saca el valor del #nameInput
                 var message = messageField.val(); //saca el valor del mensaje que esta escrito

                 //SAVE DATA TO FIREBASE AND EMPTY FIELD
                 messagesRef.push({name:username, text:message}); // Luego, hace un push a la base de datos ese push es un metodo implementado con firebase.js que agregamos, envia el nombre y el mensaje, y luego 
                 messageField.val(''); // con esto resetea el valor de lo que habiamos escrito y lo deja en blanco despues de presionar enter, es una cadena vacia
             }
         });

         // Add a callback that is triggered for each chat message. alguna duda hasta ahora? NO :d oki

         // recurda que messageRef, es practicamente tu base de datos o backend mira
         // bueno aqui dice que el limite de mensajes visibles en el documento va ser 10, y que se va ir agregagando ese 'on' crea un elemetno child_added cada vez que alguien presiona enter
         messagesRef.limit(10).on('child_added', function (snapshot) {
             //GET DATA
             var data = snapshot.val();
             var username = data.name || "Intruso"; //el username puede ser uno que nosotros hayamos puesto y si no se pone ahi indican que sera un "anonymous "
             var message = data.text; // ya ahora, bueno esto es igual con el mensaje que escribimos

             //CREATE ELEMENTS MESSAGE & SANITIZE TEXT, esto crea elementos en el DOM, osea, los crea nada mas para poder visualizar los mensajes que envias, y otros envian 
             var messageElement = $("<li class='emotico'>"); //esto esta raro xD, chiza? si alguna pregunta?
              //vamos a analizar como esta esto en nuestra web
             var nameElement = $("<strong class='example-chat-username'></strong>")
                 nameElement.text(username + "   : ");
             messageElement.text(message).prepend(nameElement);
            // $(".emotico").emoticonize();
             //ADD MESSAGE
             messageList.append(messageElement)

             //SCROLL TO BOTTOM OF MESSAGE LIST
             messageList[0].scrollTop = messageList[0].scrollHeight;
         });

          $('.menu-options-more').hover(function(){
                $('#menu-initial').removeClass("hidden-menu");
         });

         $('.menu-options-more').mouseleave(function(){
             $('#menu-initial').addClass("hidden-menu");
             
