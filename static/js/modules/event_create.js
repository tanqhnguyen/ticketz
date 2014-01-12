require([
  'underscore'
  , 'views/event_create/main'
  , 'models/event'
], function(_, MainView, Event){
  window.ticketz = window.ticketz || {};

  var event = new Event({
    ticketTypes: [],
    title: 'My Event',
    address_name: 'My House',
    address1: 'Pihkalankatu 5D',
    address2: 'Apt. 91',
    city: 'Turku',
    zipcode: 20610,
    description: '<h4><span style="font-weight: bold;">The standard Lorem Ipsum passage, used since the 1500s</span></h4><div><br></div><div>"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div><div><br></div><h4><span style="font-weight: bold;">Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h4><div><br></div><div>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</div>',
    json: {
      detailBodyBgColor: '#ffffff',
      detailTitleBgColor: '#307ecc',
      detailTitleColor: '#ffffff',
      locationTitleBgColor: '#307ecc',
      locationTitleColor: '#ffffff',
      locationBodyBgColor: '#ffffff',
      locationBodyColor: '#000000',
      ticketTitleBgColor: '#307ecc',
      ticketTitleColor: '#ffffff',
      ticketBodyBgColor: '#ffffff',
      ticketBodyColor: '#000000'
    }
  });

  var view = new MainView({
    el: $('#event-create'),
    model: event    
  });

  view.render();
});