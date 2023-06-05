from pathlib import Path
import locale
from datetime import datetime
import scrapy
from elitserien.items import GameItems


locale.setlocale(locale.LC_ALL, 'sv_SE')


class TableSpider(scrapy.Spider):
    name = "ElitserienFixed"

    def start_requests(self):
        urls = [
            "https://sv.wikipedia.org/wiki/Elitserien_i_bandy_2013/2014",
            
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        results = response.xpath('//table[contains(.,"Matchresultat")]//ul')
        
        halftimeArray = results.css('li').re('\((.*?)\)')
        count = 1
        for result in halftimeArray:
            game_id = count
            count += 1
            halftime_result = result            
            if len(result) > 5:
                thirds = result.split(',')
                halftime_home_goal = int((thirds[0].split('-')[0])) + int((thirds[1].split('-')[0]))
                halftime_away_goal = int((thirds[0].split('-')[1])) + int((thirds[1].split('-')[1]))
            else: 
                halftime_home_goal = int(result.split('-')[0])
                halftime_away_goal = int(result.split('-')[1])
            
            yield{
                'game_id': game_id,
                'halftime_result': halftime_result,
                'halftime_home_goal': halftime_home_goal,
                'halftime_away_goal': halftime_away_goal
            }
            
        