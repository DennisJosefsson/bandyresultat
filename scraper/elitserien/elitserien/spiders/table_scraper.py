from pathlib import Path
import locale
from datetime import datetime
import scrapy
from elitserien.items import GameItems


locale.setlocale(locale.LC_ALL, 'sv_SE')


class TableSpider(scrapy.Spider):
    name = "ElitserienTablesMen"

    def start_requests(self):
        urls = [
            "https://sv.wikipedia.org/wiki/Elitserien_i_bandy_2013/2014",
            
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        results = response.xpath('//table[contains(.,"Matchresultat")]//ul')
        games = results.css('li::text').getall()

        game_items = GameItems()

        for game in games:
            date = ' '.join(game.split(' ')[0:3])
            parts = game.split('-')
            
            game_items['date'] = datetime.strptime(date, '%d %B %Y').date()
            game_items['home_team_id'] = ' '.join(''.join(parts[0]).split(' ')[3:])
            game_items['away_team_id'] = ' '.join(''.join(parts[1]).split(' ')[0:-1])
            game_items['result'] = parts[1].split(' ')[-1] + '-' + parts[2].split(' ')[0]
            game_items['home_goal'] = int(parts[1].split(' ')[-1])
            game_items['away_goal'] = int(parts[2].split(' ')[0])
            game_items['season_id'] = 109
            
            
            yield game_items
            
        