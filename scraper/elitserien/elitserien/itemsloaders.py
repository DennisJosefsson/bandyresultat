from itemloaders.processors import TakeFirst, MapCompose
from scrapy.loader import ItemLoader
from datetime import datetime

class GameLoader(ItemLoader):
    
    default_output_processor = TakeFirst()
    date_in = MapCompose(lambda date_string: datetime.strptime(' '.join(date_string.split(' ')[0:3]), '%d %B %Y').date())
    homeTeamId_in = MapCompose(lambda home_team_string: ' '.join(''.join(home_team_string[0]).split(' ')[3:]))
    awayTeamId_in = MapCompose(lambda away_team_string: ' '.join(''.join(away_team_string[1]).split(' ')[0:-1]))
    result_in = MapCompose(lambda result_string: result_string.split('-')[1].split(' ')[-1] + '-' + result_string.split('-')[2].split(' ')[0])
    homeGoals_in = MapCompose(lambda homegoal_string: homegoal_string[1].split(' ')[-1])
    # awayGoals_in = MapCompose(lambda awaygoal_string: awaygoal_string[2].split(' ')[0])
    