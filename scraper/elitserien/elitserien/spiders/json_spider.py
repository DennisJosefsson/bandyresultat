from pathlib import Path
import locale
from datetime import datetime
import scrapy
from elitserien.items import GameItems
import json


locale.setlocale(locale.LC_ALL, 'sv_SE')


class TableSpider(scrapy.Spider):
    name = "ElitrapportJson"

    def start_requests(self):
        urls = [
            "https://www.elitrapport.se/api/games.php?pgsid=10104&season=2013",
            "https://www.elitrapport.se/api/games.php?pgsid=10174&season=2013"
            
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        data = json.loads(response.text[9:-1])
        game_items = GameItems()
        for item in data:
            game_items['date'] = item['Date'].split(' ')[0]
            game_items['home_team_id'] = item['HomeID']
            game_items['away_team_id'] = item['AwayID']
            game_items['result'] = item['HomeGoals'] + '-' + item['AwayGoals']
            game_items['home_goal'] = item['HomeGoals']
            game_items['away_goal'] = item['AwayGoals']
            game_items['season_id'] = 108
            if item['Serie'] == 'Elitserien': 
                game_items['category'] = 'regular'
                game_items['group'] = 'elitserien'
                game_items['playoff'] = False
            if item['Serie'] == 'Elitseriekval A': 
                game_items['category'] = 'qualification'
                game_items['group'] = 'KvalA'
                game_items['playoff'] = False
            if item['Serie'] == 'Elitseriekval B': 
                game_items['category'] = 'qualification'
                game_items['group'] = 'KvalB'
                game_items['playoff'] = False
            if item['Serie'] == 'Kvartsfinaler': 
                game_items['category'] = 'quarter'
                game_items['group'] = 'Q1'
                game_items['playoff'] = True
            if item['Serie'] == 'Semifinal': 
                game_items['category'] = 'semi'
                game_items['group'] = 'S1'
                game_items['playoff'] = True
            if item['Serie'] == 'Final': 
                game_items['category'] = 'final'
                game_items['group'] = 'final'
                game_items['playoff'] = True
            
                       

    def parse_page2(self, response):
        game_items = response.meta['item']
        home_goals = 0
        away_goals = 0

        game_data = json.loads(response.text[14:-1])
        for data in game_data:
            if data['Period'] == '1' and data['Homegoal'] == '1':
                home_goals += 1
            if data['Period'] == '1' and data['Awaygoal'] == '1':
                away_goals += 1
            game_items['halftime_home_goal'] = home_goals
            game_items['halftime_away_goal'] = away_goals
            yield game_items