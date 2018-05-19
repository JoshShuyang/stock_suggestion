jQuery(document).ready(function($) {

	'use strict';

	/************** Mixitup (Filter Projects) *********************/
    $('.projects-holder').mixitup({
        effects: ['fade','grayscale'],
        easing: 'snap',
        transitionSpeed: 400
    });

    let strategyChoices = [];

    $(document).on("keyup", "#stack_value", function(){
      toogleHintAndSubmitBtn();
    });

    $(document).on("click", ".strategy-option", function(){
        // toggle icon visibility
        $(this).find("i.strategy-checked-icon").toggleClass("invisible");

        // update selected strategies
        let key = $(this).find("h4").text();
        let keyIndex = strategyChoices.indexOf(key);
        if(keyIndex < 0)
        {
          strategyChoices.push(key);
        }
        else
        {
          strategyChoices.splice(keyIndex, 1);
        }

        toogleHintAndSubmitBtn();

        console.log(strategyChoices);
    });

    $(document).on("click", "#get_suggestion", function(){

        let $form = $("#strategy_selection_form");
        $form.find("#selected_strategies_val").val(JSON.stringify(strategyChoices));
        $form.submit();

    });


 function toogleHintAndSubmitBtn()
  {
    let $selection_hint = $("#selection_hint");
    let $suggestion_btn_container = $("#suggestion_btn_container");
    if(validStratrgiesInput())
    {
      $selection_hint.hide();
      $suggestion_btn_container.show();
    }
    else
    {
      $selection_hint.show();
      $suggestion_btn_container.hide();
    }
  }

  function validStratrgiesInput()
  {
    let stackValue = $("#stack_value").val();
    if(!stackValue || stackValue.length < 1)
    {
      return false;
    }
    if(strategyChoices.length > 2
      || strategyChoices.length <= 0
      || parseFloat(stackValue) < 5000)
    {
      return false;
    }

    return true;
  }
});