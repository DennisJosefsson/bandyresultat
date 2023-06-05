# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ElitserienItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class GameItems(scrapy.Item):
    date = scrapy.Field()
    home_team_id = scrapy.Field()
    away_team_id = scrapy.Field()
    result = scrapy.Field()
    halftime_result = scrapy.Field()
    halftime_home_goal = scrapy.Field()
    halftime_away_goal = scrapy.Field()
    home_goal = scrapy.Field()
    away_goal = scrapy.Field()
    season_id = scrapy.Field()
    category = scrapy.Field()
    group = scrapy.Field()
    playoff = scrapy.Field()
    