from app.PickStrategies import get_all, get_strategy, get_historical_strategy
from flask import render_template, flash, redirect, request
from app import app
from pprint import pprint
import json


@app.route('/stock_suggestion', methods=['GET', 'POST'])
def invest():
    if request.method =='POST':
        try:
            amount = float(request.form['amount'])
        except ValueError:
            return render_template('404.html', errorMsg="Invalid input stock value",)

        if amount < 5000:
            return render_template('404.html', errorMsg="Please input stock value above 5000")
        #pprint(amount)
        choices = request.form['seletedStrategies']
        #pprint(choices)
        choices = json.loads(choices)
        if len(choices) <= 0 or len(choices) > 2:
            return render_template('404.html')

        stocklist = get_all(choices)
        stockInfo = get_strategy(stocklist, amount)
        #pprint(stocklist)
        stockHistInfo = get_historical_strategy(stocklist, amount)
        return render_template("output.html", stockInfo=stockInfo, stockHistInfo=stockHistInfo)


    return render_template('index.html')