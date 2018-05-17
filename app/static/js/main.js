jQuery(document).ready(function($) {

	'use strict';

	/************** Mixitup (Filter Projects) *********************/
    $('.projects-holder').mixitup({
        effects: ['fade','grayscale'],
        easing: 'snap',
        transitionSpeed: 400
    });

    let crazy = window.crazy ? window.crazy : {};
    crazy.selectedStrategies = [];

    $(document).on("keyup", "#input_amount", function(){
      toogleHintAndSubmitBtn();
    });

    $(document).on("click", ".invest-strategy", function(){
        // toggle icon visibility
        $(this).find("i.strategy-checked-icon").toggleClass("invisible");

        // update selected strategies
        let key = $(this).find("h4").text();
        let keyIndex = crazy.selectedStrategies.indexOf(key);
        if(keyIndex < 0)
        {
          crazy.selectedStrategies.push(key);
        }
        else
        {
          crazy.selectedStrategies.splice(keyIndex, 1);
        }

        toogleHintAndSubmitBtn();

        console.log(crazy.selectedStrategies);
    });

    $(document).on("click", "#submit_strategy_selection", function(){

        let $form = $("#strategy_selection_form");
        $form.find("#selected_strategies_val").val(JSON.stringify(crazy.selectedStrategies));
        $form.submit();

    });


 function toogleHintAndSubmitBtn()
  {
    let $selection_hint = $("#selection_hint");
    let $submit_btn_container = $("#submit_btn_container");
    if(validStratrgiesInput())
    {
      $selection_hint.hide();
      $submit_btn_container.show();
    }
    else
    {
      $selection_hint.show();
      $submit_btn_container.hide();
    }
  }

  function validStratrgiesInput()
  {
    let inputAmount = $("#input_amount").val();
    if(!inputAmount || inputAmount.length < 1)
    {
      return false;
    }
    if(crazy.selectedStrategies.length > 2
      || crazy.selectedStrategies.length <= 0
      || parseFloat(inputAmount) < 5000)
    {
      return false;
    }

    return true;
  }
});