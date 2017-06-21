<?php

class ListerField extends InputField {

  static public $assets = array(
    'css' => array('select.css', 'lister.css'),
    'js' => array('select.js', 'lister.js')
  );

  public function input() {
    $input = parent::input();
    $input->data('field','lister');
    $input->addClass('lister_value');
    $script = '<script>var lister__select_text = "' . c::get('lister_select', 'Select an asset from the list.') . '";var lister__empty_text = "' . c::get('lister_empty', 'No assets found.') . '";</script>';
    $loading = c::get('lister_loading', 'loading assets...');
    $loader = '<div class="lister_loader">' . $loading . '</div>';
    return  $script . $loader . $input;
  }

}

?>