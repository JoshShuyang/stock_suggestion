jQuery(document).ready(function($) {

	'use strict';

	/************** Mixitup (Filter Projects) *********************/
    $('.projects-holder').mixitup({
        effects: ['fade','grayscale'],
        easing: 'snap',
        transitionSpeed: 400
    });

    let strategyChoices = [];

    //key up event after finishing input stock value
    $(document).on("keyup", "#stack_value", function(){
      suggestionBtnToggle();
    });

    //click event for each strategy
    $(document).on("click", ".strategy-option", function(){
        $(this).find("i.strategy-selected").toggleClass("invisible");
        let strategy = $(this).find("h4").text();
        let strategyIndex = strategyChoices.indexOf(strategy);

        if(strategyIndex < 0)
            // add new strategy
          strategyChoices.push(strategy);
        else
            // uncheck a existing strategy
          strategyChoices.splice(strategyIndex, 1);

        suggestionBtnToggle();
    });

    $(document).on("click", "#get_suggestion", function(){

        let $form = $("#strategy_selection_form");
        $form.find("#selected_strategies_val").val(JSON.stringify(strategyChoices));
        $form.submit();

    });


    function suggestionBtnToggle()
    {
        let $reminder = $("#reminder");
        let $suggestion_btn = $("#suggestion_btn");

        if (inputValidation())
        {
          $reminder.hide();
          $suggestion_btn.show();
        }
        else
        {
          $reminder.show();
          $suggestion_btn.hide();
        }
    }
    
    function inputValidation()
    {
        let stackValue = $("#stack_value").val();

        if (isNaN(parseInt(stackValue)) || isNaN(stackValue))
          return false;

        return !(strategyChoices.length > 2
          || strategyChoices.length <= 0
          || parseInt(stackValue) < 5000);
    }
});