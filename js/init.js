(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  });
  $(document).ready(function(){
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'tab_id');
    $('.tooltipped').tooltip({delay: 50});
    init.setTransform(100);
    init.iniciar();
    $("body").delegate('#editar','click', function(){
      var id = $(this).attr('name');
      init.editar(id)
      });
  });
  $("#openTasks").click(function(){
    $("#tasks").show();
    $("#contents").hide();
    $("#setup").hide()
  });
  $("#openContent").click(function(){
    $("#tasks").hide();
    $("#contents").show();
    $("#setup").hide()
  });
  $("#openSetup").click(function(){
    $("#tasks").hide();
    $("#contents").hide();
    $("#setup").show()
  })
  $('.button-collapse').sideNav({
    edge: 'right', // Choose the horizontal origin
  }
);
$('.collapsible').collapsible();
$("#novo").click(function(){
  $("#crearMembro").show();
  $("#editarMembro").hide();
})
$('#crearMembro').click(function($){
  init.crearMembro()
});
$('#editarMembro').click(function(){
  init.salvarEditar()
})

var init = {
  iniciar: function(){
    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
    if(oldItems.length){
      $.map( oldItems, function(item){
        init.listarMembros(item)
      })
    }
  },
  setTransform: function(n){
    $('nav-mobile').css("transform","translateX("+n+"%) !important")
  },
  listarMembros:function(item){
    $("#cards").after("<div class='col s3 m3 l3'>"+
      "<div class='card'>"+
        "<div class='card-content'>"+
          "<img class='circle img-menu center' src='https://placeholdit.imgix.net/~text?txtsize=33&txt=50%C3%97150&w=70&h=70'>"+
          "<p class='center name-user'>"+item.first_name+"</p>"+
          "<p class='center email-user'>"+item.email+"</p>"+
        "</div>"+
      "  <div class='card-action row center'>"+
          "<a class='tooltipped s3' data-position='bottom s3' data-delay='50' data-tooltip='Curtir' href='' ><i class='fa fa-thumbs-up fa-lg set-grey' aria-hidden='true'></i></a>"+
          "<a id='editar' name='"+item.id+"' class='editar-card s3' data-position='bottom' data-delay='50' data-tooltip='Editar' href='javascript:void(0)'  ><i class='fa fa-file-text-o fa-lg set-grey' aria-hidden='true'></i></a>"+
          "<a class=' tooltipped s3' data-position='bottom' data-delay='50' data-tooltip='Visualizar' href='#'><i class='fa fa-eye fa-lg set-grey' aria-hidden='true'></i></a>"+
          "<a class='tooltipped s3' data-position='bottom' data-delay='50' data-tooltip='Mais' href='#' ><i class='fa fa-ellipsis-h fa-lg set-grey' aria-hidden='true'></i></a>"+
        "</div>"+
      "</div>"+
    "</div>")
  },
  crearMembro: function(){

    $("#id").val(Math.floor(Math.random() * (10 + 1) + 0));
    var form2=$('form').serializeArray();
    var form={};
    $.map(form2, function(input) {
       form[input.name] = input.value;
   }) ;
    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
    if(oldItems.length){
      for( var i=0; i< oldItems.length; i++) {
        if(oldItems[i].email == form.email) {
          alert("O Membro ja foi adicionado")
          break;
        }
        else {
          oldItems.push(form);
          localStorage.setItem('itemsArray', JSON.stringify(oldItems));
          init.listarMembros(form);
          alert("Novo membro adicionado");
          break;
        }
      };
    }else {
      oldItems=[form];
      localStorage.setItem('itemsArray', JSON.stringify(oldItems));
      init.listarMembros(form);
      alert("Novo membro adicionado");
    }
  },
  salvarEditar: function(){
    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) ;
    var form2=$('form').serializeArray();
    var form={};
    $.map(form2, function(input) {
       form[input.name] = input.value;
    }) ;
    for (var i = 0; i < oldItems.length; i++) {
      if(oldItems[i].id === form.id){  //look for match with name
       oldItems[i].first_name = form.first_name;
       oldItems[i].email = form.email;  //add two
       break;  //exit loop since you found the person
           }
        }
    localStorage.setItem('itemsArray', JSON.stringify(oldItems));
    $("#cards").nextAll().remove()
    init.iniciar();
    alert("O membro foi editado com successo")

  },
  uniqId:function(){
    return Math.round(new Date().getTime() + (Math.random() * 100));
  },
  getElementId: function(id){
    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) ;
    var item=$.grep(oldItems, function(obj) {
        return obj.id === id;
    });
    return item
  },
  editar:function(id){
    $('.button-collapse').sideNav('show');
    item = init.getElementId(id);
    $("#id").val(item[0].id)
    $("#first_name").val(item[0].first_name);
    $("#email").val(item[0].email);
    $("#crearMembro").hide();
    $("#editarMembro").show();
  }
}
})(jQuery); // end of jQuery name space
