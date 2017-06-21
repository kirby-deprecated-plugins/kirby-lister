var lister__debugging = false;

function lister__debug(msg) {
  if (window.console && lister__debugging) {
    console.log('[lister] ' + msg);
  }
}

$(document).on('change', 'select.lister', function (e) {

  var lister__optionSelected = $(this).find('option:selected');
  var lister__valueSelected = lister__optionSelected.val();
  var lister__textSelected = lister__optionSelected.text();

  $(this).prev('input[type=lister]').val(lister__textSelected);

  lister__debug(lister__textSelected);

});

/* Ref. http://gregfranko.com/jquery.selectBoxIt.js */

var lister__asset_sidebar = 'aside .sidebar-content .sidebar-list:not(.datalist-items) > li > a.draggable.ui-draggable.ui-draggable-handle';
var lister__asset_holder = 'aside .sidebar-content .sidebar-list:not(.datalist-items) li a.draggable';
var lister__asset_name;
var lister__asset_source;

$.fn.lister = function() {

  $('input[type=lister]').each( function(i, obj) {

    if ($(this).attr('data-lister') != 'true') {

      $(this).attr('data-lister', 'true');
      $(this).after('<select class="lister"><option value="null" class="no-preview">' + lister__select_text + '</option></select>');

        if ($(lister__asset_sidebar).length) {
          lister__get_asset_list();
        } else {
          $('.lister_loader').text(lister__empty_text).addClass('lister_empty');
        }

      }

  });

};

function lister__get_asset_list() {

  $(lister__asset_holder).each(function(index) {

    lister__asset_source = $(this).data('url');
    lister__asset_name = $(this).data('helper');

    if (lister__asset_source == null) {
      var lister__classname = ' class="no-preview"';
      lister__debug('asset : null');
    } else {
      lister__debug('asset : ' + lister__asset_source );
      var lister__classname = '';
    }

    $('select.lister').append($('<option' + lister__classname + '></option>').attr('data-iconurl', lister__asset_source).text(lister__asset_name));

    lister__debug('name  : ' + lister__asset_name );

  });

  lister__initialize_list();

}

function lister__initialize_list() {

  $('select.lister').each( function(i, obj) {
    var lister__selected_val = $(this).prev('input[type=lister]').val();
    var lister__selected_text = lister__selected_val == ''?'vcUuIVgxy4YgdslJTywcXCMJKqsFYqVp':lister__selected_val;
    $('option:contains("' + lister__selected_text + '")', this).attr('selected', 'selected');
  });

  $('select.lister').bind( {
    'create': function(ev, obj) {
      $('.lister_loader').hide();
    }
  });

  $('select.lister').selectBoxIt();

}

lister__debug('initialized');